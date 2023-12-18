import { DatasetInfo } from "../../Types/Intefaces/DatasetInfo"
import { MemoryInfo } from "../../Types/Intefaces/MemoryInfo"
import { PoolInfo } from "../../Types/Intefaces/PoolInfo"
import { ProcessorInfo } from "../../Types/Intefaces/ProcessorInfo"
import { SystemInfo } from "../../Types/Intefaces/SystemInfo"

export async function fetchInfo(url: string, token: string): Promise<{
    systemInfo: SystemInfo
    processorInfo: ProcessorInfo
}> {
    const res = await fetch(`${url}/api/v2.0/system/info`, {
        headers: {
            Authorization: token
        }
    })

    const json = await res.json()

    const systemInfo: SystemInfo = json
    const processorInfo: ProcessorInfo = json

    return {
        systemInfo,
        processorInfo
    }
}

export async function fetchPoolInfo(url: string, token: string): Promise<PoolInfo[]> {
    const res = await fetch(`${url}/api/v2.0/pool`, {
        headers: {
            Authorization: token
        }
    })
    const json = await res.json()

    const poolInfo: PoolInfo[] = json
    return poolInfo
}

export async function fetchDatasetInfo(url: string, token: string): Promise<DatasetInfo[]> {
    const res = await fetch(`${url}/api/v2.0/pool/dataset`, {
        headers: {
            Authorization: token
        }
    })
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
} {          
    return {
        cpuUsage: stats.fields.cpu.average.usage as number,
        cpuMaxTemp: Math.max(...Object.values<number>(stats.fields.cpu.temperature_celsius)),
        memoryInfo: stats.fields.memory,
        readSpeed: stats.fields.disks.read_bytes,
        writeSpeed: stats.fields.disks.write_bytes
    }
}
