import { Layout } from "@ui-kitten/components";

import SystemCard from "../Components/Cards/OverviewScreenCards/SystemCard";
import ProcessorCard from "../Components/Cards/OverviewScreenCards/ProcessorCard";
import MemoryCard from "../Components/Cards/OverviewScreenCards/MemoryCard";
import StorageCard from "../Components/Cards/OverviewScreenCards/StorageCard";
import NetworkCard from "../Components/Cards/OverviewScreenCards/NetworkCard";
import { CVerticalSpacer } from "../Components/Custom/CVerticalSpacer";
import { BaseView } from "./BaseView";
import useOverviewViewModel from "../ViewModels/OverviewViewModel";


export default function OverviewView() {
    const {
        systemInfo, processorInfo, memoryInfo, datasetInfo, networkInterfaceInfo, cpuUsage, cpuMaxTemp, readSpeed, writeSpeed
    } = useOverviewViewModel()
    
    return (
        <BaseView>
            <Layout style={{backgroundColor: "transparent"}}>
                <SystemCard systemInfo={systemInfo}/>
                <CVerticalSpacer/>
                <ProcessorCard cpuUsage={cpuUsage} cpuMaxTemp={cpuMaxTemp} processorInfo={processorInfo}/>
                <CVerticalSpacer/>
                <MemoryCard memoryInfo={memoryInfo} systemInfo={systemInfo}/>
                <CVerticalSpacer/>
                <StorageCard readSpeed={readSpeed} writeSpeed={writeSpeed} datasetInfo={datasetInfo}/>
                <CVerticalSpacer/>
                <NetworkCard networkInterfaceInfo={networkInterfaceInfo}/>
            </Layout>
        </BaseView>
    )
}