import { Card, Icon, Text, useTheme } from "@ui-kitten/components"
import { CIconHeader } from "../Typography/CIconHeader"
import { CLabel } from "../Typography/CLabel"
import { View } from "react-native"

export default function SystemCard() {
    const theme = useTheme()

    return (
        <Card>
            <CIconHeader iconName="nas">
                System
            </CIconHeader>

            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <View style={{justifyContent: "space-evenly"}}>
                    <CLabel name="Platform" value="Generic" />
                    <CLabel name="Version" value="Scale" />
                    <CLabel name="Hostname" value="truenas" />
                    <CLabel name="Uptime" value="1 day" />
                </View>

                <Icon style={{height: 110, width: 110, color: theme["color-primary-500"]}} name="nas" pack="material"/>
            </View>
            
        </Card>
    )
}