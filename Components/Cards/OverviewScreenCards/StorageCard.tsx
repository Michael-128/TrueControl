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
import { PoolInfo } from "../../../Types/Intefaces/PoolInfo"
import { DatasetInfo } from "../../../Types/Intefaces/DatasetInfo"

export default function StorageCard(props: {readSpeed: number, writeSpeed: number, datasetInfo: DatasetInfo[]}) {
    const theme = useTheme()

    return (
        <Card>
            <CIconHeader iconName="harddisk">
                Storage
            </CIconHeader>

            <CDivider/>
            
            <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                <CSpeedometerChart value={props.readSpeed} maxValue={100 * 1024 * 1024} title="Read" subtitle={toSize(props.readSpeed)+"/s"} />
                <CSpeedometerChart value={props.writeSpeed} maxValue={100 * 1024 * 1024} title="Write" subtitle={toSize(props.writeSpeed)+"/s"} />
            </View>

            <Text category="h4">
                Pools
            </Text>

            <CDivider/>

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
        </Card>
    )
}