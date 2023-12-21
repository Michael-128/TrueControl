import { Text, useTheme } from "@ui-kitten/components";
import { View } from "react-native";



export function CChip(props: {text: string, outlineColor?: string, backgroundColor?: string, textColor?: string}) {
    const theme = useTheme()

    const defaultOutlineColor = theme["color-basic-600"]
    const defaultTextColor = theme["color-basic-700"]
    const defaultBackgroundColor = theme["color-basic-200"]
    
    return (
        <View style={{
            borderWidth: 1,
            borderRadius: 25,
            borderColor: props.outlineColor ? props.outlineColor : defaultOutlineColor,
            backgroundColor: props.backgroundColor ? props.backgroundColor : defaultBackgroundColor,
            padding: 5,
            paddingHorizontal: 10,
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Text category="c2" style={{color: props.textColor ? props.textColor : defaultTextColor}}>{props.text}</Text>
        </View>
    )
}

export const CGreenChip = (props: {text: string}) => {
    const theme = useTheme()
    return (<CChip outlineColor={theme["color-success-600"]} backgroundColor={theme["color-success-200"]} textColor={theme["color-success-700"]} text={props.text}/>)
}

export const CRedChip = (props: {text: string}) => {
    const theme = useTheme()
    return (<CChip outlineColor={theme["color-danger-600"]} backgroundColor={theme["color-danger-200"]} textColor={theme["color-danger-700"]} text={props.text}/>)
}

export const CBlueChip = (props: {text: string}) => {
    const theme = useTheme()
    return (<CChip outlineColor={theme["color-info-600"]} backgroundColor={theme["color-info-200"]} textColor={theme["color-info-700"]} text={props.text}/>)
}