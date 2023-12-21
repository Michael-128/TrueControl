import { View } from "react-native";

export function CHorizontalSpacer(props: {margin?: number}) {
    return (
        <View style={{marginHorizontal: props.margin ? props.margin : 10}}/>
    )
}