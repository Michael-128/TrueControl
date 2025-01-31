import { Layout } from "@ui-kitten/components";
import { BaseView } from "./BaseView";
import { CVerticalSpacer } from "../Components/Custom/CVerticalSpacer";
import { useEffect, useState } from "react";
import { ConnectionStatus } from "../Types/Enums/ConnectionStatus";
import { CredentialsCard } from "../Components/Cards/ConnectivityScreenCards/CredentialsCard";
import { ConnectionStatusCard } from "../Components/Cards/ConnectivityScreenCards/ConnectionsStatusCard";
import base64 from "react-native-base64";
import { Storage } from "../Components/Storage/Storage";
import { useConnectivityViewModel } from "../ViewModels/ConnectivityViewModel";

export function ConnectivityView(props: {isConnected?: (isConnected: boolean) => void}) {
    const { connectionStatus, handleSave } = useConnectivityViewModel(props.isConnected)

    return (
        <BaseView>
            <Layout style={{backgroundColor: "transparent"}}>
                <ConnectionStatusCard connectionStatus={connectionStatus}/>
                <CVerticalSpacer/>
                <CredentialsCard onSave={handleSave}/>
            </Layout>
        </BaseView>
    )
}