import AsyncStorage from "@react-native-async-storage/async-storage";
import base64 from "react-native-base64";

export interface Credentials {
    url: string, 
    username: string, 
    password: string,
    token: string
}

export class Storage {
    static saveCredentials(url: string, username: string, password: string) {
        AsyncStorage.setItem("credentials", JSON.stringify({
            url,
            username,
            password,
            token: "Basic " + base64.encode(username+":"+password)
        }))
    }

    static async getCredentials(): Promise<Credentials | null> {
        const res = await AsyncStorage.getItem("credentials")
        if(!res) return null

        return JSON.parse(res)
    }
}