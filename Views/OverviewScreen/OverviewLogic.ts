import { DatasetInfo } from "../../Types/Intefaces/DatasetInfo"
import { MemoryInfo } from "../../Types/Intefaces/MemoryInfo"
import { NetworkInterfaceInfo } from "../../Types/Intefaces/NetworkInterfaceInfo"
import { PoolInfo } from "../../Types/Intefaces/PoolInfo"
import { ProcessorInfo } from "../../Types/Intefaces/ProcessorInfo"
import { SystemInfo } from "../../Types/Intefaces/SystemInfo"

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function getFetch(url: string, token: string, retry: boolean = true) {
    try {
        const req = await fetch(url, {
            headers: {
                Authorization: token
            }
        })

        return req
    } catch(e) {
        await sleep(3000)
        return await getFetch(url, token, retry)
    }
}

export async function fetchInfo(url: string, token: string): Promise<{
    systemInfo: SystemInfo
    processorInfo: ProcessorInfo
}> {
    const res = await getFetch(`${url}/api/v2.0/system/info`, token)

    const json = await res.json()

    const systemInfo: SystemInfo = json
    const processorInfo: ProcessorInfo = json

    return {
        systemInfo,
        processorInfo
    }
}

export async function fetchPoolInfo(url: string, token: string): Promise<PoolInfo[]> {
    const res = await getFetch(`${url}/api/v2.0/pool`, token)
    const json = await res.json()

    const poolInfo: PoolInfo[] = json
    return poolInfo
}

export async function fetchDatasetInfo(url: string, token: string): Promise<DatasetInfo[]> {
    const res = await getFetch(`${url}/api/v2.0/pool/dataset`, token)
    const json = await res.json()

    const datasetInfo: DatasetInfo[] = json
    return datasetInfo
}


export function fetchWSInfo(stats: any): {
    cpuUsage: number
    cpuMaxTemp: number
    memoryInfo: MemoryInfo
    readSpeed: number
    writeSpeed: number
    networkInterfaceInfo: NetworkInterfaceInfo[]
} {          
    return {
        cpuUsage: stats.fields.cpu.average.usage as number,
        cpuMaxTemp: Math.max(...Object.values<number>(stats.fields.cpu.temperature_celsius)),
        memoryInfo: stats.fields.memory,
        readSpeed: stats.fields.disks.read_bytes,
        writeSpeed: stats.fields.disks.write_bytes,
        networkInterfaceInfo: Object.entries(stats.fields.interfaces).filter(([key, value]) => !key.includes("veth")).map(([key, value]) => { 
            const inteface: NetworkInterfaceInfo = value as NetworkInterfaceInfo
            inteface.name = key
            return inteface
        })
    }
}
