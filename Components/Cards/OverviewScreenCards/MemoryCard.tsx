import { Card, Text, useTheme } from "@ui-kitten/components"
import { CIconHeader } from "../../Typography/CIconHeader"
import { View } from "react-native"
import { CLabel } from "../../Typography/CLabel"
import { CPieChart } from "../../Charts/CPieChart"
import { CColoredDot } from "../../Typography/CColoredDot"
import { MemoryInfo } from "../../../Models/MemoryInfo"
import { useEffect, useState } from "react"
import { toSize } from "../../Helpers/Helpers"
import { CDivider } from "../../Custom/CDivider"
import { BaseOverviewCard } from "./BaseOverviewCard"
import { SystemInfo } from "../../../Models/SystemInfo"


export default function MemoryCard(props: {memoryInfo: MemoryInfo | null, systemInfo: SystemInfo | null}) {

    const theme = useTheme()

    const [totalMemory, setTotalMemory] = useState<number>(0)

    const [freeMemory, setFreeMemory] = useState<number>(1)
    const [arcMemory, setArcMemory] = useState<number>(0)
    const [appsMemory, setAppsMemory] = useState<number>(0)

    useEffect(() => {
        if(!props.systemInfo) return
        
        setTotalMemory(props.systemInfo.physmem)
    }, [props.systemInfo])

    useEffect(() => {
        if(!props.memoryInfo) return

        setFreeMemory(props.memoryInfo.classes.unused)
        setArcMemory(props.memoryInfo.classes.arc)
        setAppsMemory(props.memoryInfo.classes.apps)
    }, [props.memoryInfo])

    return (
        <BaseOverviewCard title="Memory" iconName="memory">
            <View style={{flex: 1, flexDirection: "row", justifyContent:"space-between"}}>
                <View style={{
                    justifyContent: "space-evenly",
                }}>
                    <View style={{flexDirection: "row", alignItems: 'center', marginBottom: 4}}>
                        <Text style={{fontWeight: 'bold'}}>{toSize(totalMemory)} </Text><Text>Total</Text>
                    </View>

                    <View style={{flexDirection: "row", alignItems: 'center'}}>
                        <CColoredDot color={theme["color-primary-600"]}/>
                        <Text style={{fontWeight: 'bold'}}>{toSize(arcMemory)} </Text><Text>Cache</Text>
                    </View>

                    <View style={{flexDirection: "row", alignItems: 'center'}}>
                        <CColoredDot color={theme["color-primary-400"]}/>
                        <Text style={{fontWeight: 'bold'}}>{toSize(appsMemory)} </Text><Text>Apps</Text>
                    </View>

                    <View style={{flexDirection: "row", alignItems: 'center'}}>
                        <CColoredDot color={theme["color-primary-300"]}/>
                        <Text style={{fontWeight: 'bold'}}>{toSize(freeMemory)} </Text><Text>Free</Text>
                    </View>
                </View>
                <View>
                    <CPieChart accessor="ram" data={[
                        {
                            name: "Cache",
                            ram: arcMemory,
                            color: theme["color-primary-600"]
                        },
                        {
                            name: "Services",
                            ram: appsMemory,
                            color: theme["color-primary-400"]
                        },
                        {
                            name: "Free",
                            ram: freeMemory,
                            color: theme["color-primary-300"]
                        }
                    ]}/>
                </View>
            </View>
        </BaseOverviewCard>
    )
}