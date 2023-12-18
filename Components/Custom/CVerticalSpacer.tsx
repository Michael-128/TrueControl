import { View } from "react-native";

export function CVerticalSpacer(props: {margin?: number}) {
    return (
        <View style={{marginVertical: props.margin ? props.margin : 10}}/>
    )
}