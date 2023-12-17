import { Text, Layout, Card, Input, Button } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import { CDivider } from "../../Custom/CDivider";
import { CVerticalSpacer } from "../../Custom/CVerticalSpacer";
import { Storage } from "../../Storage/Storage";

export function CredentialsCard(props: {onSave?: (url: string, username: string, password: string) => void}) {
    const [url, setUrl] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        async function getSavedCredentials() {
            const credentials = await Storage.getCredentials()

            if(credentials) {
                setUrl(credentials.url)
                setUsername(credentials.username)
            }
        }
        getSavedCredentials()
    }, [])

    return (
        <Card>
            <Text category="h3">Credentials</Text>
            <Text category="s1">
                Input your TrueNAS credentials here.
            </Text>

            <CDivider/>

            <Input
                placeholder='URL'
                value={url}
                onChangeText={setUrl}
                autoCapitalize="none"
                autoCorrect={false}
            />

            <CVerticalSpacer/>

            <Input
                placeholder='Username'
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
            />

            <CVerticalSpacer/>

            <Input
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
            />

            <CVerticalSpacer/>

            <Button onPress={() => {props.onSave ? props.onSave(url, username, password) : () => {}}}>Save</Button>
        </Card>
    )
}