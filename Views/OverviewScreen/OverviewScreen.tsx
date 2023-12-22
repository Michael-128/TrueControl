import { Layout } from "@ui-kitten/components";

import SystemCard from "../../Components/Cards/OverviewScreenCards/SystemCard";
import ProcessorCard from "../../Components/Cards/OverviewScreenCards/ProcessorCard";
import MemoryCard from "../../Components/Cards/OverviewScreenCards/MemoryCard";
import StorageCard from "../../Components/Cards/OverviewScreenCards/StorageCard";
import NetworkCard from "../../Components/Cards/OverviewScreenCards/NetworkCard";
import { CVerticalSpacer } from "../../Components/Custom/CVerticalSpacer";
import { BaseScreen } from "../BaseScreen";
import { useEffect, useState } from "react";
import { Credentials, Storage } from "../../Components/Storage/Storage";
import { SystemInfo } from "../../Types/Intefaces/SystemInfo";
import { TrueNasWS, TrueNasWSStatic } from "../../Components/Helpers/TrueNasWS";
import { ProcessorInfo } from "../../Types/Intefaces/ProcessorInfo";
import { MemoryInfo } from "../../Types/Intefaces/MemoryInfo";
import { fetchDatasetInfo, fetchInfo, fetchWSInfo } from "./OverviewLogic";
import { DatasetInfo } from "../../Types/Intefaces/DatasetInfo";
import { NetworkInterfaceInfo } from "../../Types/Intefaces/NetworkInterfaceInfo";
import { OverviewSkeleton } from "./OverviewSkeleton";
import { toTime } from "../../Components/Helpers/Helpers";


export default function OverviewScreen() {

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

    if(!isLoaded()) return (
        <OverviewSkeleton/>
    )

    return (
        <BaseScreen>
            <Layout style={{backgroundColor: "transparent"}}>
                <SystemCard systemInfo={systemInfo}/>
                <CVerticalSpacer/>
                <ProcessorCard cpuUsage={cpuUsage} cpuMaxTemp={cpuMaxTemp} processorInfo={processorInfo}/>
                <CVerticalSpacer/>
                <MemoryCard memoryInfo={memoryInfo}/>
                <CVerticalSpacer/>
                <StorageCard readSpeed={readSpeed} writeSpeed={writeSpeed} datasetInfo={datasetInfo}/>
                <CVerticalSpacer/>
                <NetworkCard networkInterfaceInfo={networkInterfaceInfo}/>
            </Layout>
        </BaseScreen>
    )
}