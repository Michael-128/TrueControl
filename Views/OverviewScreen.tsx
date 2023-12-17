import { Layout, Text, TopNavigation, Icon, IconElement, TopNavigationAction } from "@ui-kitten/components";

import SystemCard from "../Components/Cards/OverviewScreenCards/SystemCard";
import ProcessorCard from "../Components/Cards/OverviewScreenCards/ProcessorCard";
import MemoryCard from "../Components/Cards/OverviewScreenCards/MemoryCard";
import StorageCard from "../Components/Cards/OverviewScreenCards/StorageCard";
import NetworkCard from "../Components/Cards/OverviewScreenCards/NetworkCard";
import { CDivider } from "../Components/Custom/CDivider";
import { ScrollView, View } from "react-native";
import { CBottomNavigation } from "../Components/Navigation/CBottomNavigation";
import { CVerticalSpacer } from "../Components/Custom/CVerticalSpacer";
import { BaseScreen } from "./BaseScreen";
import { useEffect, useState } from "react";
import { Credentials, Storage } from "../Components/Storage/Storage";
import { SystemInfo } from "../Types/Intefaces/SystemInfo";
import { TrueNasWS } from "../Components/Helpers/TrueNasWS";
import { ProcessorInfo } from "../Types/Intefaces/ProcessorInfo";


export default function OverviewScreen() {

    const [credentials, setCredentials] = useState<Credentials | null>(null)
    const [systemInfo, setSytemInfo] = useState<SystemInfo | null>(null)
    const [processorInfo, setProcessorInfo] = useState<ProcessorInfo | null>(null)

    const [cpuUsage, setCpuUsage] = useState(0)

    useEffect(() => {
        async function getCredentials() {
            const cred = await Storage.getCredentials()

            if(cred) {
                setCredentials(cred)
            }
        }
        getCredentials()
    }, [])

    async function fetchSystemInfo() {
        const res = await fetch(`${credentials!.url}/api/v2.0/system/info`, {
            headers: {
                Authorization: credentials!.token
            }
        })

        const json = await res.json()

        const sysInfo: SystemInfo = json
        const procInfo: ProcessorInfo = json
        setSytemInfo(sysInfo)
        setProcessorInfo(procInfo)
    }

    useEffect(() => {
        if(!credentials) return

        const trueNasWS = new TrueNasWS(credentials!.url, credentials!.username, credentials!.password)

        const intervalID = setInterval(() => {
            trueNasWS.nextStats = (stats: any) => {
                try {
                    setCpuUsage(stats.fields.cpu.average.usage)
                } catch {}
            }
        }, 1500)

        fetchSystemInfo()

        return () => {
            clearInterval(intervalID)
            trueNasWS.close()
        }
    }, [credentials])

    return (
        <BaseScreen>
            <Layout style={{backgroundColor: "transparent"}}>
                <SystemCard systemInfo={systemInfo}/>
                <CVerticalSpacer/>
                <ProcessorCard cpuUsage={cpuUsage} processorInfo={processorInfo}/>
                <CVerticalSpacer/>
                <MemoryCard/>
                <CVerticalSpacer/>
                <StorageCard/>
                <CVerticalSpacer/>
                <NetworkCard/>
            </Layout>
        </BaseScreen>
    )
}