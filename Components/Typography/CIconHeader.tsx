import { Text, Icon } from "@ui-kitten/components"
import { View } from "react-native"

export function CIconHeader(props: { children: string, iconName: string }) {
    const size = 26;

    return (
        <View style={{flexDirection: "row", alignItems: "center"}}>
            <Icon style={{height: size, width: size, marginRight: 10}} name={props.iconName} pack="material"/>
            <Text category="h4">{props.children}</Text>
        </View>
    )
}
