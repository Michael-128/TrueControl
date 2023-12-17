import { Layout, Text, TopNavigation, Icon, IconElement, TopNavigationAction } from "@ui-kitten/components";

import SystemCard from "../Components/Cards/SystemCard";
import ProcessorCard from "../Components/Cards/ProcessorCard";
import MemoryCard from "../Components/Cards/MemoryCard";
import StorageCard from "../Components/Cards/StorageCard";
import NetworkCard from "../Components/Cards/NetworkCard";
import { CDivider } from "../Components/Custom/CDivider";
import { ScrollView, View } from "react-native";
import { CBottomNavigation } from "../Components/Navigation/CBottomNavigation";
import { CVerticalSpacer } from "../Components/Custom/CVerticalSpacer";
import { BaseScreen } from "./BaseScreen";



interface SystemInfo {
    uptime: string
    model: string
    physmem: string
    cores: number
    physical_cores: number
}

export default function OverviewScreen() {
    return (
        <BaseScreen>
            <Layout style={{backgroundColor: "transparent"}}>
                <SystemCard/>
                <CVerticalSpacer/>
                <ProcessorCard/>
                <CVerticalSpacer/>
                <MemoryCard/>
                <CVerticalSpacer/>
                <StorageCard/>
                <CVerticalSpacer/>
                <NetworkCard/>
            </Layout>
        </BaseScreen>
    )
}