import { Card, Icon, Text, useTheme } from "@ui-kitten/components"
import { CIconHeader } from "../../Typography/CIconHeader"
import { LineChart } from "react-native-chart-kit"
import { useEffect, useState } from "react"
import { colorWithOpacity, toSize } from "../../Helpers/Helpers"
import { CDivider } from "../../Custom/CDivider"
import { NetworkInterfaceInfo } from "../../../Models/NetworkInterfaceInfo"
import { CVerticalSpacer } from "../../Custom/CVerticalSpacer"
import { View } from "react-native"
import { BaseOverviewCard } from "./BaseOverviewCard"

export default function NetworkCard(props: {networkInterfaceInfo: NetworkInterfaceInfo[]}) {
    const theme = useTheme()

    return (
        <BaseOverviewCard title="Network" iconName="server-network">
          {
            props.networkInterfaceInfo.flatMap((networkInterface: NetworkInterfaceInfo) => {
              return (
                <Card key={networkInterface.name}>
                  <View style={{flexDirection: "column"}}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                      <Text category="h4">{networkInterface.name}</Text>
                    </View>
                    <CDivider/>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                      <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Icon style={{height: 24, width: 24, color: theme["color-info-500"]}} name="arrow-up" pack="material"/>
                        <Text category="h6" style={{fontWeight: "normal"}}>{toSize(networkInterface.sent_bytes_rate)}/s</Text>
                      </View>
                      <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Text category="h6" style={{fontWeight: "normal"}}>{toSize(networkInterface.received_bytes_rate)}/s</Text>
                        <Icon style={{height: 24, width: 24, color: theme["color-success-600"]}} name="arrow-down" pack="material"/>
                      </View>
                    </View>
                  </View>
                </Card>
              )
            })
          }
        </BaseOverviewCard>
    )
}

/*

const send  = {
      labels: ["30s", "25s", "20s", "15s", "10s", "5s"],
      datasets: [
        {
          data: interfaceSend.slice(-30, -1),
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
<LineChart
                data={receive}
                width={300}
                height={200}
                withDots={false}
                withVerticalLines={false}
                verticalLabelRotation={30}
                chartConfig={chartConfig}
                formatYLabel={(value: string) => {
                    return toSize(parseInt(value))
                }}
            />
            */