import { Text, Layout, Card, Input, Button } from "@ui-kitten/components";
import { BaseScreen } from "./BaseScreen";
import { CDivider } from "../Components/Custom/CDivider";
import { CVerticalSpacer } from "../Components/Custom/CVerticalSpacer";
import { useState } from "react";

export function ConnectivityScreen() {

    const [url, setUrl] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <BaseScreen>
            <Layout style={{backgroundColor: "transparent"}}>
                <Card>
                    <Text category="h3">Connectivity</Text>
                    <Text category="s1">
                        Input your TrueNAS credentials here.
                    </Text>

                    <CDivider/>

                    <Input
                        placeholder='URL'
                        value={url}
                        onChangeText={setUrl}
                    />

                    <CVerticalSpacer/>

                    <Input
                        placeholder='Username'
                        value={username}
                        onChangeText={setUsername}
                    />

                    <CVerticalSpacer/>

                    <Input
                        placeholder='Password'
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />

                    <CVerticalSpacer/>

                    <Button>Save</Button>
                </Card>
            </Layout>
        </BaseScreen>
    )
}