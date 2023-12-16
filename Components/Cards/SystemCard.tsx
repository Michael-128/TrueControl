import { Card, Icon, Text } from "@ui-kitten/components"
import { CIconHeader } from "../Typography/CIconHeader"
import { CLabel } from "../Typography/CLabel"

export default function SystemCard() {
    return (
        <Card>
            <CIconHeader iconName="nas">
                System
            </CIconHeader>

            <CLabel name="Platform" value="Generic" />
            <CLabel name="Version" value="Scale" />
            <CLabel name="Hostname" value="truenas" />
            <CLabel name="Uptime" value="1 day" />
        </Card>
    )
}