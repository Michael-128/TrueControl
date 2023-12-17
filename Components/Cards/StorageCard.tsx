import { Card, Text, useTheme } from "@ui-kitten/components"
import { CIconHeader } from "../Typography/CIconHeader"
import { CStorageChart } from "../Charts/CStorageChart"
import { View } from "react-native"

export default function StorageCard() {
    const theme = useTheme()

    return (
        <Card>
            <CIconHeader iconName="harddisk">
                Storage
            </CIconHeader>

            <Card style={{marginTop: 10}}>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Text category="h6">NAS</Text>
                    <CStorageChart progress={29}/>
                </View>
            </Card>

            <Card style={{marginVertical: 10}}>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Text category="h6">NVME</Text>
                    <CStorageChart progress={29}/>
                </View>
            </Card>

            <Card style={{marginBottom: 10}}>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Text category="h6">NVME2</Text>
                    <CStorageChart progress={29}/>
                </View>
            </Card>
        </Card>
    )
}