import { Icon, Input, useTheme } from "@ui-kitten/components";
import { BaseView } from "./BaseView";
import { useEffect, useState } from "react";
import { getFetch } from "./BaseLogic/BaseLogic";
import { Credentials, Storage } from "../Components/Storage/Storage";
import { AppInfo } from "../Models/AppInfo";
import { View } from "react-native";
import { AppCard } from "../Components/Cards/AppCard";
import useAppsViewModel from "../ViewModels/AppsViewModel";

const SearchIcon = (props: any) => <Icon {...props} name="layers-search-outline" pack="material"/>

export function AppsView() {
    const {
        appInfo,
        appSearch,
        setAppSearch,
        refresh,
        credentials
    } = useAppsViewModel()

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