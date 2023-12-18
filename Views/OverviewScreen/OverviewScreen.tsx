import { Layout, Text, TopNavigation, Icon, IconElement, TopNavigationAction } from "@ui-kitten/components";

import SystemCard from "../../Components/Cards/OverviewScreenCards/SystemCard";
import ProcessorCard from "../../Components/Cards/OverviewScreenCards/ProcessorCard";
import MemoryCard from "../../Components/Cards/OverviewScreenCards/MemoryCard";
import StorageCard from "../../Components/Cards/OverviewScreenCards/StorageCard";
import NetworkCard from "../../Components/Cards/OverviewScreenCards/NetworkCard";
import { CDivider } from "../../Components/Custom/CDivider";
import { ScrollView, View } from "react-native";
import { CBottomNavigation } from "../../Components/Navigation/CBottomNavigation";
import { CVerticalSpacer } from "../../Components/Custom/CVerticalSpacer";
import { BaseScreen } from "../BaseScreen";
import { useEffect, useState } from "react";
import { Credentials, Storage } from "../../Components/Storage/Storage";
import { SystemInfo } from "../../Types/Intefaces/SystemInfo";
import { TrueNasWS } from "../../Components/Helpers/TrueNasWS";
import { ProcessorInfo } from "../../Types/Intefaces/ProcessorInfo";
import { MemoryInfo } from "../../Types/Intefaces/MemoryInfo";
import { fetchDatasetInfo, fetchInfo, fetchPoolInfo, fetchWSInfo } from "./OverviewLogic";
import { PoolInfo } from "../../Types/Intefaces/PoolInfo";
import { DatasetInfo } from "../../Types/Intefaces/DatasetInfo";


export default function OverviewScreen() {

    const [credentials, setCredentials] = useState<Credentials | null>(null)

    const [systemInfo, setSytemInfo] = useState<SystemInfo | null>(null)
    const [processorInfo, setProcessorInfo] = useState<ProcessorInfo | null>(null)
    const [memoryInfo, setMemoryInfo] = useState<MemoryInfo | null>(null)
    const [datasetInfo, setDatasetInfo] = useState<DatasetInfo[]>([])

    const [cpuUsage, setCpuUsage] = useState(0)
    const [cpuMaxTemp, setCpuMaxTemp] = useState(0) 

    const [readSpeed, setReadSpeed] = useState(0)
    const [writeSpeed, setWriteSpeed] = useState(0)

    async function getCredentials() {
        const cred = await Storage.getCredentials()
        if(cred) setCredentials(cred)
    }

    useEffect(() => {
        getCredentials()
    }, [])
    
    function fetchAllInfo() {
        fetchInfo(credentials!.url, credentials!.token).then(info => {
            setSytemInfo(info.systemInfo)
            setProcessorInfo(info.processorInfo)
        })

        fetchDatasetInfo(credentials!.url, credentials!.token).then(info => {
            setDatasetInfo(info)
        })
    }

    useEffect(() => {
        if(!credentials) return
        
        fetchAllInfo()

        const trueNasWS = new TrueNasWS(credentials!.url, credentials!.username, credentials!.password)

        const intervalID = setInterval(() => {
            trueNasWS.nextStats = (stats: any) => {
                const wsInfo = fetchWSInfo(stats)
                setCpuUsage(wsInfo.cpuUsage)
                setCpuMaxTemp(wsInfo.cpuMaxTemp)
                setMemoryInfo(wsInfo.memoryInfo)
                setReadSpeed(wsInfo.readSpeed)
                setWriteSpeed(wsInfo.writeSpeed)
            }
        }, 1500)

        return () => clearInterval(intervalID)
    }, [credentials])

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
                <NetworkCard/>
            </Layout>
        </BaseScreen>
    )
}