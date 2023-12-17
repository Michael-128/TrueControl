import { Text, useTheme } from "@ui-kitten/components";
import { View } from "react-native";
import { ProgressChart } from "react-native-chart-kit";

export function CStorageChart(props: {progress: number}) {
    const theme = useTheme()

    const scaleDown = 2

    const chartConfig = {
        fillShadowGradient: "black",
        backgroundGradientToOpacity: 0,
        backgroundGradientFromOpacity: 0,
        color: (opacity = 1) => {
            if(opacity >= 0.5)
                return `${theme["color-success-600"]}`

            return `${theme["color-success-200"]}`
        },
    };

    return (
        <View style={{
            width: 100 / scaleDown,
            height: 100 / scaleDown,
        }}>
            <ProgressChart 
                data={{
                    data: [props.progress/100]
                }}
                width={100 / scaleDown}
                height={100 / scaleDown}
                radius={44.5 / scaleDown}
                strokeWidth={10 / scaleDown}
                chartConfig={chartConfig}
                hideLegend={true}
            />
            <View style={{
                position: "absolute",
                width: 100 / scaleDown,
                height: 100 / scaleDown,
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text category="p1" style={{color: theme["color-success-700"]}}>{props.progress}%</Text>
            </View>
        </View>
    )
}