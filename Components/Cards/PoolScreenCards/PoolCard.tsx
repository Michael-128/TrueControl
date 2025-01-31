import { Card, Text, useTheme } from "@ui-kitten/components"
import { CIconHeader } from "../../Typography/CIconHeader"
import { CStorageChart } from "../../Charts/CStorageChart"
import { View } from "react-native"
import { CLabel } from "../../Typography/CLabel"
import { shortenString, toSize } from "../../Helpers/Helpers"
import Speedometer from "react-native-cool-speedometer/dist/Speedometer"
import { Arc, Background, DangerPath, Indicator, Marks, Needle, Progress } from "react-native-cool-speedometer"

import * as RN from 'react-native'
import { CSpeedometerChart } from "../../Charts/CSpeedometerChart"
import { CDivider } from "../../Custom/CDivider"
import { CVerticalSpacer } from "../../Custom/CVerticalSpacer"
import { CProgressBar } from "../../Custom/CProgressBar"
import { PoolInfo } from "../../../Models/PoolInfo"
import { DatasetInfo } from "../../../Models/DatasetInfo"
import { BaseOverviewCard } from "../OverviewScreenCards/BaseOverviewCard"

export default function PoolCard(props: {datasetInfo: DatasetInfo[]}) {
    const theme = useTheme()

    return (
        <BaseOverviewCard title="Storage" iconName="harddisk">
            <Text category="h4">
                Pools
            </Text>

            <CDivider/>

            <>
                {props.datasetInfo.filter(dataset => !dataset.id.includes("/")).flatMap(dataset => {
                    const totalSpace = dataset.available.parsed + dataset.used.parsed

                    return (
                        <Card style={{marginTop: 10}} key={dataset.id}>
                            <View style={{flexDirection: "column"}}>
                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <Text category="h6">{shortenString(dataset.name, 8)}</Text>
                                    <Text category="h6" style={{fontWeight: 'normal'}}>{toSize(dataset.available.parsed)} Free</Text>
                                </View>
                                <CVerticalSpacer margin={5}/>
                                <CProgressBar progress={dataset.used.parsed / totalSpace * 100}/>
                            </View>
                        </Card>
                    )
                })}
            </>
        </BaseOverviewCard>
    )
}