import { Text, useTheme } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Arc, Progress } from "react-native-cool-speedometer";
import Speedometer from "react-native-cool-speedometer/dist/Speedometer";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import Svg from 'react-native-svg';
import av from 'animate-value'

export function CSpeedometerChart(props: {value: number, maxValue: number, title: string, subtitle: string}) {
    const theme = useTheme()

    const [currentValue, setCurrentValue] = useState(props.value)

    useEffect(() => {
        av({
            from: currentValue,
            to: props.value,
            duration: 500,
            change: (value: number) => setCurrentValue(value)
        }).then;
    }, [props.value])

    return (
        <Speedometer
            value={currentValue}
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