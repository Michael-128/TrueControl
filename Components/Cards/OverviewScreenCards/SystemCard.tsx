import { Card, Icon, Text, useTheme } from "@ui-kitten/components"
import { CIconHeader } from "../../Typography/CIconHeader"
import { CLabel } from "../../Typography/CLabel"
import { View } from "react-native"
import { SystemInfo } from "../../../Types/Intefaces/SystemInfo"
import { useEffect, useState } from "react"

export default function SystemCard(props: {systemInfo: SystemInfo | null}) {
    const theme = useTheme()
    const systemInfo = props.systemInfo
    
    const [manufacturer, setManufacturer] = useState("")
    const [version, setVersion] = useState("")
    const [hostname, setHostname] = useState("")
    const [uptime, setUptime] = useState("")

    useEffect(() => {
        if(!systemInfo) return
        
        setManufacturer(systemInfo.system_manufacturer)
        setVersion(systemInfo.version)
        setHostname(systemInfo.hostname)
        setUptime(systemInfo.uptime.split(":").slice(0, -1).join(" hours ")+" minutes")
    }, [systemInfo])

    return (
        <Card>
            <CIconHeader iconName="nas">
                System
            </CIconHeader>

            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <View style={{justifyContent: "space-evenly"}}>
                    <CLabel name="Manufacturer" value={manufacturer} />
                    <CLabel name="Version" value={version} />
                    <CLabel name="Hostname" value={hostname} />
                    <CLabel name="Uptime" value={uptime} />
                </View>
            </View>
            
        </Card>
    )
}