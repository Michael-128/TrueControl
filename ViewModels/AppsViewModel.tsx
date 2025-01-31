import { useTheme } from "@ui-kitten/components"
import { useEffect, useState } from "react"
import { Credentials, Storage } from "../Components/Storage/Storage"
import { AppInfo } from "../Models/AppInfo"
import { getFetch } from "../Views/BaseLogic/BaseLogic"

function useAppsViewModel() {
    const theme = useTheme()
    const [credentials, setCredentials] = useState<Credentials>()

    async function getCredentials() {
        const cred = await Storage.getCredentials()
        if(cred) setCredentials(cred)
    }

    useEffect(() => {
        getCredentials()
    }, [])


    const [appInfo, setAppInfo] = useState<AppInfo[]>([])
    const [appSearch, setAppSearch] = useState("")

    async function fetchAllInfo() {
        const res = await getFetch(credentials!.url+"/api/v2.0/chart/release", credentials!.token)
        const json: AppInfo[] = await res.json()
        setAppInfo(json)
    }

    async function refresh() {
        fetchAllInfo()
    }

    useEffect(() => {
        if(!credentials) return

        fetchAllInfo()
        const interval = setInterval(() => fetchAllInfo(), 2500)

        return () => clearInterval(interval)
    }, [credentials])

    return {
        appInfo,
        appSearch,
        setAppSearch,
        refresh,
        credentials
    }
}

export default useAppsViewModel;