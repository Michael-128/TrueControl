import { DefaultTheme } from "@react-navigation/native"
import { Layout, Text } from "@ui-kitten/components"
import { View } from "react-native"

export function CLabel(props: { name: string, value: string }) {
    return (
        <View style={{flexDirection: "column"}}>
            <Text category="p1" style={{color: DefaultTheme.colors.label, fontSize: 14, marginBottom: 1, marginTop: 4}}>
                {props.name}
            </Text>
            <Text category="p1" style={{fontWeight: "bold"}}>
                {props.value}
            </Text>
        </View>
    )
}
