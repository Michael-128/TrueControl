import { Card, Layout, Text } from "@ui-kitten/components"
import { CIconHeader } from "../../Typography/CIconHeader"
import { CProgressChart } from "../../Charts/CProgressChart";
import { CLabel } from "../../Typography/CLabel";
import { View } from "react-native";
import { ProcessorInfo } from "../../../Models/ProcessorInfo";
import { useEffect, useState } from "react";
import { CDivider } from "../../Custom/CDivider";
import { BaseOverviewCard } from "./BaseOverviewCard";

export default function ProcessorCard(props: {cpuUsage: number, cpuMaxTemp: number, processorInfo: ProcessorInfo | null}) {
    
    const [model, setModel] = useState("")
    const [physicalCores, setPhysicalCores] = useState("")
    const [cores, setCores] = useState("")

    useEffect(() => {
        if(!props.processorInfo) return

        setModel(props.processorInfo.model)
        setPhysicalCores(props.processorInfo.physical_cores.toString())
        setCores(props.processorInfo.cores.toString())
    }, [props.processorInfo])

    return (
        <BaseOverviewCard title="Processor" iconName="chip">
            <View style={{flex: 1, flexDirection: "row", justifyContent:"flex-start"}}>
                <View>
                    <CProgressChart progress={props.cpuUsage}/>
                </View>
                <View style={{
                    justifyContent: "space-evenly",
                    marginLeft: 20
                }}>
                    <CLabel name="Cores" value={physicalCores} />
                    <CLabel name="Threads" value={cores} />
                    <CLabel name="Hottest" value={`${props.cpuMaxTemp}°C`} />
                </View>
            </View>
        </BaseOverviewCard>
    )
}

//<CLabel name="Model" value={model} />