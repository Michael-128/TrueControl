import { useEffect, useState } from "react"
import { Credentials, Storage } from "../Components/Storage/Storage"
import { SystemInfo } from "../Models/SystemInfo"
import { ProcessorInfo } from "../Models/ProcessorInfo"
import { MemoryInfo } from "../Models/MemoryInfo"
import { DatasetInfo } from "../Models/DatasetInfo"
import { NetworkInterfaceInfo } from "../Models/NetworkInterfaceInfo"
import { fetchDatasetInfo, fetchInfo, fetchWSInfo } from "../Views/OverviewScreen/OverviewLogic"
import { TrueNasWSStatic } from "../Components/Helpers/TrueNasWS"

function useOverviewViewModel() {
    const [credentials, setCredentials] = useState<Credentials | null>(null)

    const [systemInfo, setSytemInfo] = useState<SystemInfo | null>(null)
    const [processorInfo, setProcessorInfo] = useState<ProcessorInfo | null>(null)
    const [memoryInfo, setMemoryInfo] = useState<MemoryInfo | null>(null)
    
    const [datasetInfo, setDatasetInfo] = useState<DatasetInfo[]>([])
    const [networkInterfaceInfo, setNetworkInterfaceInfo] = useState<NetworkInterfaceInfo[]>([])

    const [cpuUsage, setCpuUsage] = useState(0)
    const [cpuMaxTemp, setCpuMaxTemp] = useState(0) 

    const [readSpeed, setReadSpeed] = useState(0)
    const [writeSpeed, setWriteSpeed] = useState(0)

    const [isFetchDataLoaded, setIsFetchDataLoaded] = useState(false)
    const [isWSDataLoaded, setIsWSDataLoaded] = useState(false)

    const isLoaded = () => {return isFetchDataLoaded && isWSDataLoaded}

    async function getCredentials() {
        const cred = await Storage.getCredentials()
        if(cred) setCredentials(cred)
    }

    useEffect(() => {
        getCredentials()
    }, [])
    
    function fetchAllInfo() {
        const infoPromise = fetchInfo(credentials!.url, credentials!.token).then(info => {
            setSytemInfo(info.systemInfo)
            setProcessorInfo(info.processorInfo)
        })

        const datasetPromise = fetchDatasetInfo(credentials!.url, credentials!.token).then(info => {
            setDatasetInfo(info)
        })

        Promise.all([infoPromise, datasetPromise]).then(() => {
            setIsFetchDataLoaded(true)
        })
    }

    useEffect(() => {
        if(!credentials) return

        if(!credentials.url.includes("http://") && !credentials.url.includes("https://")) return
        
        fetchAllInfo()

        TrueNasWSStatic.init(credentials!.url, credentials!.username, credentials!.password)

        const intervalID = setInterval(() => {
            TrueNasWSStatic.nextStats = (stats: any) => {
                if(!stats) return

                const wsInfo = fetchWSInfo(stats)

                setCpuUsage(wsInfo.cpuUsage)
                setCpuMaxTemp(wsInfo.cpuMaxTemp)
                setMemoryInfo(wsInfo.memoryInfo)
                setReadSpeed(wsInfo.readSpeed)
                setWriteSpeed(wsInfo.writeSpeed)
                setNetworkInterfaceInfo(wsInfo.networkInterfaceInfo)
                setIsWSDataLoaded(true)
            }
        }, 1500)
        return () => clearInterval(intervalID)
    }, [credentials])

    return {
        systemInfo,
        processorInfo,
        memoryInfo,
        datasetInfo,
        networkInterfaceInfo,
        cpuUsage,
        cpuMaxTemp,
        readSpeed,
        writeSpeed,
        isLoaded
    }
}

export default useOverviewViewModel

