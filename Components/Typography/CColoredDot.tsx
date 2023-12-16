import { ColorValue, View } from "react-native";

export function CColoredDot(props: {color: ColorValue}) {
    return (
        <View style={{
            backgroundColor: props.color,
            width: 8,
            height: 8,
            marginRight: 6,
            borderRadius: "50%"
        }} />
    )
}