import { Card, Text } from "@ui-kitten/components"
import { CIconHeader } from "../Typography/CIconHeader"

export default function StorageCard() {
    return (
        <Card>
            <CIconHeader iconName="harddisk">
                Storage
            </CIconHeader>

            <Text category="p">
                Something
            </Text>
        </Card>
    )
}