import { Card, Text, useTheme } from "@ui-kitten/components"
import { CIconHeader } from "../../Typography/CIconHeader"
import { View } from "react-native"
import { CLabel } from "../../Typography/CLabel"
import { CPieChart } from "../../Charts/CPieChart"
import { CColoredDot } from "../../Typography/CColoredDot"
import { MemoryInfo } from "../../../Types/Intefaces/MemoryInfo"
import { useEffect, useState } from "react"
import { toSize } from "../../Helpers/Helpers"
import { CDivider } from "../../Custom/CDivider"
import { BaseOverviewCard } from "./BaseOverviewCard"


export default function MemoryCard(props: {memoryInfo: MemoryInfo | null}) {

    const theme = useTheme()

    const [totalMemory, setTotalMemory] = useState<number>(0)

    const [freeMemory, setFreeMemory] = useState<number>(1)
    const [arcMemory, setArcMemory] = useState<number>(0)
    const [appsMemory, setAppsMemory] = useState<number>(0)

    useEffect(() => {
        if(!props.memoryInfo) return

        setTotalMemory(Object.values(props.memoryInfo.classes).reduce((sum: number, next: number) => sum += next))

        setFreeMemory(props.memoryInfo.classes.unused)
        setArcMemory(props.memoryInfo.classes.arc)
        setAppsMemory(props.memoryInfo.classes.apps + props.memoryInfo.classes.cache + props.memoryInfo.classes.buffers + props.memoryInfo.classes.page_tables + props.memoryInfo.classes.slab_cache)
    }, [props.memoryInfo])

    return (
        <BaseOverviewCard title="Memory" iconName="memory">
            <View style={{flex: 1, flexDirection: "row", justifyContent:"space-between"}}>
                <View style={{
                    justifyContent: "space-evenly",
                }}>
                    <CLabel name="Total" value={toSize(totalMemory)}/>
                    

                    <View style={{flexDirection: "row", alignItems: 'center'}}>
                        <CColoredDot color={theme["color-primary-600"]}/>
                        <CLabel name="ZFS Cache" value={toSize(arcMemory)}/>
                    </View>

                    <View style={{flexDirection: "row", alignItems: 'center'}}>
                        <CColoredDot color={theme["color-primary-400"]}/>
                        <CLabel name="Services" value={toSize(appsMemory)} />
                    </View>

                    <View style={{flexDirection: "row", alignItems: 'center'}}>
                        <CColoredDot color={theme["color-primary-300"]}/>
                        <CLabel name="Free" value={toSize(freeMemory)} />    
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