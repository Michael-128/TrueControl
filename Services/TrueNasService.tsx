import { Credentials, Storage } from "../Components/Storage/Storage";
import base64 from "react-native-base64";
import { SystemInfo } from "../Models/SystemInfo";
import { ProcessorInfo } from "../Models/ProcessorInfo";
import { PoolInfo } from "../Models/PoolInfo";
import { DatasetInfo } from "../Models/DatasetInfo";
import { MemoryInfo } from "../Models/MemoryInfo";
import { NetworkInterfaceInfo } from "../Models/NetworkInterfaceInfo";
import { TrueNasWSStatic } from "../Components/Helpers/TrueNasWS";

class TrueNasService {
    public static static = new TrueNasService();

    constructor() { }

    public async setCredentials(credentials: Credentials): Promise<boolean> {
        const isValid = await this.checkCredentials(credentials);

        if(isValid) {
            Storage.saveCredentials(credentials.url, credentials.username, credentials.password);
            TrueNasWSStatic.init(credentials.url, credentials.username, credentials.password);
        }

        return isValid;
    }

    private async getCredentials(): Promise<Credentials | null> {
        const credentials = await Storage.getCredentials();
        if(credentials) TrueNasWSStatic.init(credentials.url, credentials.username, credentials.password);
        return credentials;
    }

    private async fetch(path: string, method = "GET", body?: object, headers?: HeadersInit): Promise<any> {
        const credentials = await this.getCredentials();
        if(!credentials) return {};

        const authString = "Basic " + base64.encode(`${credentials.username}:${credentials.password}`);

        try {
            const res = await fetch(`${credentials.url}${path}`, {
                method: method,
                body: body ? JSON.stringify(body) : undefined,
                headers: headers ? headers : { Authorization: authString }
            })

            return await res.json();
        } catch (e) {
            console.log(e)
        }
    }

    private async checkCredentials(credentials: Credentials): Promise<boolean> {
        const authString = "Basic " + base64.encode(`${credentials.username}:${credentials.password}`);

        return await this.fetch("/api/v2.0/auth/check_user", "POST", {username: credentials.username, password: credentials.password}, { Authorization: authString });
    }

    public async checkConnection(): Promise<any> {
        const credentials = await this.getCredentials();
        if(!credentials) return false;

        return await this.fetch("/api/v2.0/auth/check_user", "POST", {username: credentials.username, password: credentials.password}, { Authorization: credentials.token });
    }

    public async fetchSystemAndProcessorInfo(): Promise<{
        systemInfo: SystemInfo
        processorInfo: ProcessorInfo
    }> {
        const json = await this.fetch("/api/v2.0/system/info")
    
        const systemInfo: SystemInfo = json
        const processorInfo: ProcessorInfo = json
    
        return {
            systemInfo,
            processorInfo
        }
    }

    public async fetchPoolInfo(): Promise<PoolInfo[]> {
        const json = await this.fetch("/api/v2.0/pool")
    
        const poolInfo: PoolInfo[] = json
        return poolInfo
    }
    
    async fetchDatasetInfo(): Promise<DatasetInfo[]> {
        const json = await this.fetch("/api/v2.0/pool/dataset")
    
        const datasetInfo: DatasetInfo[] = json
        return datasetInfo
    }
    
    
    public parseWSInfo(stats: any): {
        cpuUsage: number
        cpuMaxTemp: number
        memoryInfo: MemoryInfo
        readSpeed: number
        writeSpeed: number
        networkInterfaceInfo: NetworkInterfaceInfo[]
    } {   
        return {
            cpuUsage: stats.fields.cpu.average.usage as number,
            cpuMaxTemp: (stats.fields.cpu.temperature_celsius) ? Math.max(...Object.values<number>(stats.fields.cpu.temperature_celsius)) : 0,
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

    // export async function postScaleReplicas(url: string, token: string, releaseName: string, replicaCount: number) {
    //     const res = await postFetch(`${url}/api/v2.0/chart/release/scale`, token, {
    //         release_name: releaseName,
    //         scale_options: {
    //             replica_count: replicaCount
    //         }
    //     })
    // }
}

export default TrueNasService;