import { Card, Icon, Text, useTheme } from "@ui-kitten/components";
import { BaseScreen } from "./BaseScreen";
import { useEffect, useState } from "react";
import { fetchDatasetInfo, fetchPoolInfo } from "./OverviewScreen/OverviewLogic";
import { Credentials, Storage } from "../Components/Storage/Storage";
import PoolCard from "../Components/Cards/PoolScreenCards/PoolCard";
import { DatasetInfo } from "../Types/Intefaces/DatasetInfo";
import { CVerticalSpacer } from "../Components/Custom/CVerticalSpacer";
import { View } from "moti";
import { PoolInfo } from "../Types/Intefaces/PoolInfo";
import { CProgressBar } from "../Components/Custom/CProgressBar";
import { CDivider } from "../Components/Custom/CDivider";
import { toSize } from "../Components/Helpers/Helpers";
import { CGreenChip, CRedChip } from "../Components/Custom/Chip/CChip";
import { CHorizontalSpacer } from "../Components/Custom/CHorizontalSpacer";
import { CIconHeader } from "../Components/Typography/CIconHeader";

interface StorageInfo {
    pool: PoolInfo
    poolDataset: DatasetInfo
}

export function StorageScreen() {
    const theme = useTheme()

    const [credentials, setCredentials] = useState<Credentials | null>(null)

    async function getCredentials() {
        const cred = await Storage.getCredentials()
        if(cred) setCredentials(cred)
    }

    useEffect(() => {
        getCredentials()
    }, [])

    const [storageInfo, setStorageInfo] = useState<StorageInfo[]>([])

    async function fetchAllInfo() {
        const datasets = fetchDatasetInfo(credentials!.url, credentials!.token)
        const pools = fetchPoolInfo(credentials!.url, credentials!.token)

        Promise.all([datasets, pools]).then(([datasets, pools]) => {
            const info: StorageInfo[] = []

            pools.forEach(pool => {
                info.push({
                    pool: pool,
                    poolDataset: datasets.filter(dataset => dataset.mountpoint == pool.path)[0]
                })
            })

            setStorageInfo(info)
        })
    }
    
    useEffect(() => {
        if(!credentials) return

        fetchAllInfo()
    }, [credentials])

    return (
        <BaseScreen>
            <>
               {
                    storageInfo.flatMap(info => {
                        return (
                            <View key={info.pool.id}>
                                <Card>                                        
                                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                        <CIconHeader iconName="harddisk">
                                            {info.pool.name}
                                        </CIconHeader>
                                        <CGreenChip text={info.pool.status}/>
                                    </View>
                                    <CDivider/>

                                    <Text category="h5">Usage</Text>
                                    <CVerticalSpacer margin={5}/>

                                    <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                                        <Text category="h6" style={{fontWeight:"normal"}}>{toSize(info.poolDataset.used.parsed + info.poolDataset.available.parsed)} Total</Text>
                                        <Text category="h6" style={{fontWeight:"normal"}}>{toSize(info.poolDataset.available.parsed)} Free</Text>
                                    </View>
                                    <CVerticalSpacer margin={5}/>
                                    <CProgressBar progress={ info.poolDataset.used.parsed / (info.poolDataset.available.parsed + info.poolDataset.used.parsed) * 100 }/>
                                    
                                    {
                                        info.pool.healthy ? <></> : <>
                                            <CDivider/>
                                            <Text category="h5">Problems</Text>
                                            <CVerticalSpacer margin={3}/>
                                            <Text category="p1">{info.pool.status_detail}</Text>
                                        </>
                                    }
                                </Card>
                                <CVerticalSpacer/>
                            </View>
                        )
                    })
               }
            </>
        </BaseScreen>
    )
}

/**
 *  {
                    datasetInfo.flatMap(dataset => {
                        
                    })
                }
 */