import { Card, Layout, Text } from "@ui-kitten/components"
import { CIconHeader } from "../Typography/CIconHeader"
import { CProgressChart } from "../Charts/CProgressChart";
import { CLabel } from "../Typography/CLabel";
import { View } from "react-native";

export default function ProcessorCard() {
    

    return (
        <Card>
            <CIconHeader iconName="chip">
                Processor
            </CIconHeader>

            <View style={{flex: 1, flexDirection: "row", justifyContent:"flex-start"}}>
                <View>
                    <CProgressChart progress={26}/>
                </View>
                <View style={{
                    justifyContent: "space-evenly",
                    marginLeft: 20
                }}>
                    <CLabel name="Model" value="Intel i5" />
                    <CLabel name="Cores" value="6" />
                    <CLabel name="Threads" value="12" />
                    <CLabel name="Hottest" value="46*C" />
                </View>
            </View>
        </Card>
    )
}