import { Text, useTheme } from "@ui-kitten/components";
import { View } from "react-native";
import { Arc, Progress } from "react-native-cool-speedometer";
import Speedometer from "react-native-cool-speedometer/dist/Speedometer";

export function CSpeedometerChart(props: {value: number, maxValue: number, title: string, subtitle: string}) {
    const theme = useTheme()    
    
    return (
        <Speedometer
            value={props.value}
            max={props.maxValue}
            angle={240}
            lineCap="round"
            accentColor={theme["primary-color-800"]}
            height={120}
            width={120}
        >
            <Arc arcWidth={10} color={theme["color-primary-500"]} opacity={.1}/>
            <Progress arcWidth={10} color={theme["color-primary-500"]} />
            <View style={{alignSelf: "center", height: "100%", justifyContent: "center", alignItems: "center"}}>
                <Text category="s1">{props.title}</Text>
                <Text category="s2">{props.subtitle}</Text>
                <Text>{" "}</Text>
            </View>
        </Speedometer>
    )
}