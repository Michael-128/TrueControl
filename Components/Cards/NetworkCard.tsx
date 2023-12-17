import { Card, Text, useTheme } from "@ui-kitten/components"
import { CIconHeader } from "../Typography/CIconHeader"
import { LineChart } from "react-native-chart-kit"
import { useEffect } from "react"

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

      function colorWithOpacity(hexColor: string = "#000000", opacity: number): string {
        let expandedOpacity = opacity * 255
        let opacityHex: string = ""
        const hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]


        while(expandedOpacity != 0) {
            const quotient = Math.floor(expandedOpacity / 16)
            const remainder = expandedOpacity % 16

            opacityHex = hexValues[remainder] + opacityHex
            expandedOpacity = quotient
        }

        return hexColor + opacityHex
      } 

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