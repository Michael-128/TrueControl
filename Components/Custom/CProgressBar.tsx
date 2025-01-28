import { useTheme } from "@ui-kitten/components";
import { Text, View } from "react-native";
import { colorWithOpacity } from "../Helpers/Helpers";
import BorderRadius from "../../Types/Enums/BorderRadius";

export function CProgressBar(props: {width?: number | string, progress: number, height?: number}) {
    const theme = useTheme()

    return (
        <View style={{
            width: props.width ? props.width : "100%", 
            alignSelf: "center", 
            height: props.height ? props.height : 10, 
            backgroundColor: colorWithOpacity(theme["color-primary-500"], 0.1),
            borderRadius: BorderRadius.rounded,
            overflow: "hidden"
        }}>
            <View style={{width: `${props.progress}%`, height: props.height ? props.height : 10, backgroundColor: theme["color-primary-500"], borderRadius: "50%"}}/>
        </View>
    )
}