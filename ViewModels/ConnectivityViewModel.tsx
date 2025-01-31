// ConnectivityViewModel.js

import { useEffect, useState } from "react";
import { ConnectionStatus } from "../Types/Enums/ConnectionStatus";
import base64 from "react-native-base64";
import { Storage } from "../Components/Storage/Storage";
import TrueNasService from "../Services/TrueNasService";
import { useTrueNas } from "../Hooks/useTrueNas";

function useConnectivityViewModel() {
    const tnService = TrueNasService.static

    function handleSave(url: string, username: string, password: string) {
        tnService.setCredentials({ url, username, password, token: "Basic " + base64.encode(username + ":" + password) });
    }

    return {
        handleSave
    };
}

export default useConnectivityViewModel;