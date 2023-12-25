import { Layout } from "@ui-kitten/components";
import { BaseScreen } from "./BaseScreen";
import { CVerticalSpacer } from "../Components/Custom/CVerticalSpacer";
import { useEffect, useState } from "react";
import { ConnectionStatus } from "../Types/Enums/ConnectionStatus";
import { CredentialsCard } from "../Components/Cards/ConnectivityScreenCards/CredentialsCard";
import { ConnectionStatusCard } from "../Components/Cards/ConnectivityScreenCards/ConnectionsStatusCard";
import base64 from "react-native-base64";
import { Storage } from "../Components/Storage/Storage";

export function ConnectivityScreen(props: {isConnected?: (isConnected: boolean) => void}) {

    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(ConnectionStatus.DISCONNECTED)

    async function handleSave(url: string, username: string, password: string) {
        if(await checkConnectivity(url, username, password)) {
            setConnectionStatus(ConnectionStatus.CONNECTED)
            Storage.saveCredentials(url, username, password)
        } else {
            setConnectionStatus(ConnectionStatus.DISCONNECTED)
        }
    }

    async function checkConnectivity(url: string, username: string, password: string) {
        const authString = "Basic " + base64.encode(username+":"+password)

        const res = await fetch(`${url}/api/v2.0/auth/check_user`, {
            method: "post",
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                Authorization: authString
            }
        })

        try {
            return await res.json()
        } catch {
            return false
        }        
    }

    useEffect(() => {
        async function getStatus() {
            const credentials = await Storage.getCredentials()

            if(!credentials) {
                setConnectionStatus(ConnectionStatus.DISCONNECTED)
                return
            }

            const connectivity = await checkConnectivity(credentials.url, credentials.username, credentials.password)

            if(connectivity) {
                setConnectionStatus(ConnectionStatus.CONNECTED)
                return
            }

            setConnectionStatus(ConnectionStatus.DISCONNECTED)
        }
        getStatus()
    }, [])

    useEffect(() => {
        if(!props.isConnected) return

        if(connectionStatus == ConnectionStatus.CONNECTED)
            props.isConnected(true)
        else
            props.isConnected(false)
    }, [connectionStatus])

    return (
        <BaseScreen>
            <Layout style={{backgroundColor: "transparent"}}>
                <ConnectionStatusCard connectionStatus={connectionStatus}/>
                <CVerticalSpacer/>
                <CredentialsCard onSave={handleSave}/>
            </Layout>
        </BaseScreen>
    )
}