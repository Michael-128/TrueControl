import { Layout, Text } from "@ui-kitten/components"
import { View } from "react-native"

export function CLabel(props: { name: string, value: string }) {
    return (
        <View style={{flexDirection: "row"}}>
            <Text category="p" style={{fontWeight: "bold"}}>
                {props.name}:
            </Text>
            <Text category="p"> </Text>
            <Text category="p">
                {props.value}
            </Text>
        </View>
    )
}
