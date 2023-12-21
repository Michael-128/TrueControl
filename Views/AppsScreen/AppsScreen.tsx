import { Avatar, Button, ButtonGroup, Card, Icon, Input, Text, useTheme } from "@ui-kitten/components";
import { BaseScreen } from "../BaseScreen";
import { CIconHeader } from "../../Components/Typography/CIconHeader";
import { useEffect, useState } from "react";
import { getFetch } from "../BaseLogic/BaseLogic";
import { Credentials, Storage } from "../../Components/Storage/Storage";
import { AppInfo } from "../../Types/Intefaces/AppInfo";
import { CVerticalSpacer } from "../../Components/Custom/CVerticalSpacer";
import { Image } from "react-native";
import { View } from "moti";
import { CDivider } from "../../Components/Custom/CDivider";
import { AppsSkeleton } from "./AppsSkeleton";
import { CBlueChip, CChip, CGreenChip, CRedChip } from "../../Components/Custom/Chip/CChip";
import { CHorizontalSpacer } from "../../Components/Custom/CHorizontalSpacer";
import { AppCard } from "../../Components/Cards/AppCard";

const SearchIcon = (props: any) => <Icon {...props} name="layers-search-outline" pack="material"/>

export function AppsScreen() {
    const theme = useTheme()
    const [credentials, setCredentials] = useState<Credentials>()

    async function getCredentials() {
        const cred = await Storage.getCredentials()
        if(cred) setCredentials(cred)
    }

    useEffect(() => {
        getCredentials()
    }, [])


    const [appInfo, setAppInfo] = useState<AppInfo[]>([])
    const [appSearch, setAppSearch] = useState("")

    async function fetchAllInfo() {
        const res = await getFetch(credentials!.url+"/api/v2.0/chart/release", credentials!.token)
        const json: AppInfo[] = await res.json()
        setAppInfo(json)
    }

    useEffect(() => {
        if(!credentials) return

        fetchAllInfo()
    }, [credentials])

    if(appInfo.length == 0) {
        return (
            <AppsSkeleton/>
        )
    }

    return (
        <BaseScreen>
            <Input value={appSearch} onChangeText={setAppSearch} autoCapitalize="none" placeholder="Search" accessoryLeft={SearchIcon}/>

            <>
                {
                    appInfo.filter(app => app.name.includes(appSearch)).flatMap((app: AppInfo) => {
                        return (
                            <View key={app.id}>
                                <AppCard app={app}/>
                            </View>
                        )
                    })
                }
            </>
        </BaseScreen>
    )
}