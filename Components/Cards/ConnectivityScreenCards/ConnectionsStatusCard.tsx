import { Card, Icon, Text, useTheme } from "@ui-kitten/components";
import { View } from "react-native";
import { ConnectionStatus } from "../../../Types/Enums/ConnectionStatus";
import { useEffect, useState } from "react";
import { CLabel } from "../../Typography/CLabel";

export function ConnectionStatusCard(props: {connectionStatus: ConnectionStatus}) {
    
    const theme = useTheme()
    const connectionStatus = props.connectionStatus

    function getStatusColor() {
        switch(connectionStatus) {
            case ConnectionStatus.CONNECTED:
                return theme["color-success-600"]
            case ConnectionStatus.DISCONNECTED || ConnectionStatus.ERROR:
                return theme["color-danger-600"]
            case ConnectionStatus.CONNECTING:
                return theme["color-info-500"]
        }
    }

    return (
        <Card>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <Text category="h3">{connectionStatus}</Text>
                <Icon name="connection" pack="material" style={{height: 32, width: 32, color: getStatusColor()}} />
            </View>
        </Card>
    )
}