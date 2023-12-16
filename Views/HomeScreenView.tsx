import { Layout, Card, Text, Button, Divider } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import base64 from 'react-native-base64'

interface SystemInfo {
    uptime: string
    model: string
    physmem: string
    cores: number
    physical_cores: number
}

export default function HomeScreen() {

    const [systemInfo, setSystemInfo] = useState<SystemInfo>()

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
    }, [])

    return (
        <Layout style={{
            marginVertical: 40,
            marginHorizontal: 20
        }}>
            <Text category='h1' style={{marginBottom: 20}}>TrueControl</Text>
            
            <Layout>
                <Card>
                    <Text category="h4">System</Text>

                    <Text category="p">
                        Uptime: {systemInfo ? systemInfo.uptime : "Loading"}
                    </Text>
                    
                    <Text category="p">
                        Model: {systemInfo ? systemInfo.model : "Loading"}
                    </Text>

                    <Text category="p">
                        Cores: {systemInfo ? `${systemInfo.physical_cores}` : "Loading"}
                        
                    </Text>

                    <Text category="p">
                        Threads: {systemInfo ? `${systemInfo.cores}` : "Loading"}
                    </Text>
                </Card>

                <Divider style={{marginVertical: 10}}/>

                <Card>
                    <Text category="h4">CPU</Text>
                </Card>

                <Divider style={{marginVertical: 10}}/>

                <Card>
                    <Text category="h4">RAM</Text>
                </Card>

                <Divider style={{marginVertical: 10}}/>

                <Card>
                    <Text category="h4">Storage</Text>
                </Card>

                <Divider style={{marginVertical: 10}}/>

                <Card>
                    <Text category="h4">Network</Text>
                </Card>
                
            </Layout>
        </Layout>
    )
}