// ConnectivityViewModel.js

import { useEffect, useState } from "react";
import { ConnectionStatus } from "../Types/Enums/ConnectionStatus";
import base64 from "react-native-base64";
import { Storage } from "../Components/Storage/Storage";

function useConnectivityViewModel(isConnectedCallback?: (isConnected: boolean) => void) {
    const [connectionStatus, setConnectionStatus] = useState(ConnectionStatus.DISCONNECTED);

    async function handleSave(url: string, username: string, password: string) {
        if (await checkConnectivity(url, username, password)) {
            setConnectionStatus(ConnectionStatus.CONNECTED);
            Storage.saveCredentials(url, username, password);
        } else {
            setConnectionStatus(ConnectionStatus.DISCONNECTED);
        }
    }

    async function checkConnectivity(url: string, username: string, password: string) {
        const authString = "Basic " + base64.encode(`${username}:${password}`);

        try {
            const res = await fetch(`${url}/api/v2.0/auth/check_user`, {
                method: "POST",
                body: JSON.stringify({ username, password }),
                headers: { Authorization: authString },
            });
            return await res.json();
        } catch {
            return false;
        }
    }

    useEffect(() => {
        async function getStatus() {
            const credentials = await Storage.getCredentials();

            if (!credentials) {
                setConnectionStatus(ConnectionStatus.DISCONNECTED);
                return;
            }

            if (await checkConnectivity(credentials.url, credentials.username, credentials.password)) {
                setConnectionStatus(ConnectionStatus.CONNECTED);
            } else {
                setConnectionStatus(ConnectionStatus.DISCONNECTED);
            }
        }
        getStatus();
    }, []);

    useEffect(() => {
        if (isConnectedCallback) {
            isConnectedCallback(connectionStatus === ConnectionStatus.CONNECTED);
        }
    }, [connectionStatus]);

    return {
        connectionStatus,
        handleSave,
    };
}

export default useConnectivityViewModel;