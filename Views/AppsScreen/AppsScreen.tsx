import { Icon, Input, useTheme } from "@ui-kitten/components";
import { BaseView } from "../BaseView";
import { useEffect, useState } from "react";
import { getFetch } from "../BaseLogic/BaseLogic";
import { Credentials, Storage } from "../../Components/Storage/Storage";
import { AppInfo } from "../../Types/Intefaces/AppInfo";
import { View } from "react-native";
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

    async function refresh() {
        fetchAllInfo()
    }

    useEffect(() => {
        if(!credentials) return

        fetchAllInfo()
        const interval = setInterval(() => fetchAllInfo(), 2500)

        return () => clearInterval(interval)
    }, [credentials])

    return (
        <BaseView>
            <Input value={appSearch} onChangeText={setAppSearch} autoCapitalize="none" placeholder="Search" accessoryLeft={SearchIcon}/>

            <>
                {
                    appInfo.filter(app => app.name.includes(appSearch)).flatMap((app: AppInfo) => {
                        return (
                            <View key={app.id}>
                                <AppCard refreshApps={refresh} credentials={credentials!} app={app}/>
                            </View>
                        )
                    })
                }
            </>
        </BaseView>
    )
}