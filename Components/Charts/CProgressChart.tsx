import { Text, useTheme } from "@ui-kitten/components";
import { View } from "react-native";
import { ProgressChart } from "react-native-chart-kit";

export function CProgressChart(props: {progress: number}) {
    const theme = useTheme()

    const chartConfig = {
        fillShadowGradient: "black",
        backgroundGradientToOpacity: 0,
        backgroundGradientFromOpacity: 0,
        color: (opacity = 1) => {
            if(opacity >= 0.5)
                return `${theme["color-primary-500"]}`

            return `${theme["color-primary-100"]}`
        },
    };

    return (
        <View style={{
            width: 100,
            height: 100,
            marginVertical: 15
        }}>
            <ProgressChart 
                data={{
                    data: [props.progress/100]
                }}
                width={100}
                height={100}
                radius={44.5}
                strokeWidth={10}
                chartConfig={chartConfig}
                hideLegend={true}
            />
            <View style={{
                position: "absolute",
                width: 100,
                height: 100,
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text category="h6" style={{color: theme["color-primary-500"]}}>{props.progress}%</Text>
            </View>
        </View>
    )
}