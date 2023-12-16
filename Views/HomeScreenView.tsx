import { Layout, Card, Text, Button, Divider } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import base64 from 'react-native-base64'

import SystemCard from "../Components/Cards/SystemCard";
import ProcessorCard from "../Components/Cards/ProcessorCard";
import MemoryCard from "../Components/Cards/MemoryCard";
import StorageCard from "../Components/Cards/StorageCard";
import NetworkCard from "../Components/Cards/NetworkCard";
import { CDivider } from "../Components/Custom/CDivider";
import { ScrollView } from "react-native";

interface SystemInfo {
    uptime: string
    model: string
    physmem: string
    cores: number
    physical_cores: number
}

export default function HomeScreen() {

    /*const [systemInfo, setSystemInfo] = useState<SystemInfo>()

    async function getInfo() {
        const res = await fetch("url here", {
            headers: {
                "Authorization": "Basic " //base64 username:password
            }
        })

        if(res.status == 200) {
            const json = await res.json()
            setSystemInfo(json)
            console.log(json)
        }
    }

    useEffect(() => {
        getInfo()
    }, [])*/

    return (
        <ScrollView>
            <Layout style={{
                marginVertical: 40,
                marginHorizontal: 20
            }}>
                <Text category='h1' style={{marginBottom: 20}}>TrueControl</Text>
                
                <Layout>
                    <SystemCard/>
                    <CDivider/>
                    <ProcessorCard/>
                    <CDivider/>
                    <MemoryCard/>
                    <CDivider/>
                    <StorageCard/>
                    <CDivider/>
                    <NetworkCard/>
                </Layout>
            </Layout>
        </ScrollView>
    )
}