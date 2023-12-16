import { Text, Icon } from "@ui-kitten/components"

export function CIconHeader(props: { children: string, iconName: string }) {
    return (
        <Text category="h4">
            <Icon style={{height: 26, width: 26, marginRight: 10}} name={props.iconName} pack="material"/>
            {props.children}
        </Text>
    )
}
