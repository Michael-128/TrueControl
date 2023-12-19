import { Card } from "@ui-kitten/components";
import { CDivider } from "../../Custom/CDivider";
import { CIconHeader } from "../../Typography/CIconHeader";

export function BaseOverviewCard(props: {children: JSX.Element | JSX.Element[], title: string, iconName: string}) {
    return (
        <Card>
            <CIconHeader iconName={props.iconName}>
                {props.title}
            </CIconHeader>

            <CDivider/>

            {props.children}
        </Card>
    )
}