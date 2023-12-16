import { Card, Text, useTheme } from "@ui-kitten/components"
import { CIconHeader } from "../Typography/CIconHeader"
import { View } from "react-native"
import { CLabel } from "../Typography/CLabel"
import { CPieChart } from "../Charts/CPieChart"
import { CColoredDot } from "../Typography/CColoredDot"

export default function MemoryCard() {

    const theme = useTheme()

    return (
        <Card>
            <CIconHeader iconName="memory">
                Memory
            </CIconHeader>

            <View style={{flex: 1, flexDirection: "row", justifyContent:"space-between"}}>
                <View style={{
                    justifyContent: "space-evenly",
                }}>
                    <CLabel name="Total" value= "62.5 GiB"/>
                    

                    <View style={{flexDirection: "row", alignItems: 'center'}}>
                        <CColoredDot color={theme["color-primary-600"]}/>
                        <CLabel name="ZFS Cache" value= "47.0 GiB"/>
                    </View>

                    <View style={{flexDirection: "row", alignItems: 'center'}}>
                        <CColoredDot color={theme["color-primary-400"]}/>
                        <CLabel name="Services" value= "10.3 GiB"/>
                    </View>

                    <View style={{flexDirection: "row", alignItems: 'center'}}>
                        <CColoredDot color={theme["color-primary-300"]}/>
                        <CLabel name="Free" value= "5.3 GiB"/>    
                    </View>
                </View>
                <View>
                    <CPieChart accessor="ram" data={[
                        {
                            name: "Cache",
                            ram: 10000,
                            color: theme["color-primary-600"]
                        },
                        {
                            name: "Services",
                            ram: 4000,
                            color: theme["color-primary-400"]
                        },
                        {
                            name: "Free",
                            ram: 3000,
                            color: theme["color-primary-300"]
                        }
                    ]}/>
                </View>
            </View>
        </Card>
    )
}