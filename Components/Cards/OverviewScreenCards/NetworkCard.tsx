import { Card, Text, useTheme } from "@ui-kitten/components"
import { CIconHeader } from "../../Typography/CIconHeader"
import { LineChart } from "react-native-chart-kit"
import { useEffect } from "react"
import { colorWithOpacity } from "../../Helpers/Helpers"
import { CDivider } from "../../Custom/CDivider"

export default function NetworkCard() {
    const theme = useTheme()

    const data = {
        labels: ["30s", "25s", "20s", "15s", "10s", "5s"],
        datasets: [
          {
            data: [1000, 2000 , 1000, 500, 250, 1000, 1500, 2000, 100],
            color: () => theme["color-primary-400"], // optional
            strokeWidth: 2 // optional
          }
        ], // optional
      };

      

      const chartConfig = {
        backgroundGradientFromOpacity: 0,
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => {
            return colorWithOpacity(theme["color-primary-700"], opacity)
        },
      };

    return (
        <Card>
            <CIconHeader iconName="server-network">
                Network
            </CIconHeader>

            <CDivider/>
            
            <LineChart
                data={data}
                width={300}
                height={200}
                withDots={false}
                withVerticalLines={false}
                verticalLabelRotation={30}
                chartConfig={chartConfig}
                formatYLabel={(value: string) => {
                    return parseFloat(value).toString() + "kb/s"
                }}
            />
        </Card>
    )
}