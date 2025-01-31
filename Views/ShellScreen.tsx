import { Input, Text } from "@ui-kitten/components";
import { BaseView } from "./BaseView";
import { useEffect, useState } from "react";
import { TrueNasWSStatic } from "../Components/Helpers/TrueNasWS";
import { ScrollView } from "react-native-gesture-handler";
import { View } from "react-native";

export function ShellScreen() {
    const [log, _setLog] = useState<[string]>([""])

    function addLog(msg: string) {
        log.push(msg)
    }

    useEffect(() => {
        const ws = TrueNasWSStatic

        ws.onShellMessage = (msg: string) => {
            addLog(msg)
        }

        ws.sendShellConnect()
    }, [])

    return (
        <BaseView>
            <View style={{flexDirection: "column"}}>
                <ScrollView contentContainerStyle={{flex: 1, height: "20%"}} style={{width: "100%", backgroundColor: "black", padding: 10,}}>
                    {
                        log.flatMap((msg, index) => {
                            return <Text style={{color: "lightgreen"}} key={index} category="p1">{msg}</Text>
                        })
                    }
                </ScrollView>
                <Input/>
            </View>
        </BaseView>
    )
}