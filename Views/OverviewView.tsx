import { Layout } from "@ui-kitten/components";

import SystemCard from "../Components/Cards/OverviewScreenCards/SystemCard";
import ProcessorCard from "../Components/Cards/OverviewScreenCards/ProcessorCard";
import MemoryCard from "../Components/Cards/OverviewScreenCards/MemoryCard";
import StorageCard from "../Components/Cards/OverviewScreenCards/StorageCard";
import NetworkCard from "../Components/Cards/OverviewScreenCards/NetworkCard";
import { CVerticalSpacer } from "../Components/Custom/CVerticalSpacer";
import { BaseView } from "./BaseView";
import useOverviewViewModel from "../ViewModels/OverviewViewModel";
import { useTrueNas } from "../Hooks/useTrueNas";


export default function OverviewView() {
    const tn = useTrueNas();
    
    return (
        <BaseView>
            <Layout style={{backgroundColor: "transparent"}}>
                <SystemCard systemInfo={tn.systemInfo}/>
                <CVerticalSpacer/>
                <ProcessorCard cpuUsage={tn.cpuUsage} cpuMaxTemp={tn.cpuMaxTemp} processorInfo={tn.processorInfo}/>
                <CVerticalSpacer/>
                <MemoryCard memoryInfo={tn.memoryInfo} systemInfo={tn.systemInfo}/>
                <CVerticalSpacer/>
                <StorageCard readSpeed={tn.readSpeed} writeSpeed={tn.writeSpeed} datasetInfo={tn.datasetInfo}/>
                <CVerticalSpacer/>
                <NetworkCard networkInterfaceInfo={tn.networkInterfaceInfo}/>
            </Layout>
        </BaseView>
    )
}