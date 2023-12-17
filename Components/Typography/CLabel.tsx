import { Layout, Text } from "@ui-kitten/components"
import { View } from "react-native"

export function CLabel(props: { name: string, value: string }) {
    return (
        <View style={{flexDirection: "row"}}>
            <Text category="p1" style={{fontWeight: "bold"}}>
                {props.name}:
            </Text>
            <Text category="p1"> </Text>
            <Text category="p1">
                {props.value}
            </Text>
        </View>
    )
}
