import { Card, Text } from "@ui-kitten/components"
import { CIconHeader } from "../Typography/CIconHeader"

export default function NetworkCard() {
    return (
        <Card>
            <CIconHeader iconName="server-network">
                Network
            </CIconHeader>
            
            <Text category="p">
                Something
            </Text>
        </Card>
    )
}