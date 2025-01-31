import { useEffect, useState } from "react"
import { StorageInfo } from "../Models/StorageInfo"
import { Credentials, Storage } from "../Components/Storage/Storage"
import { fetchDatasetInfo, fetchPoolInfo } from "../Views/OverviewScreen/OverviewLogic"


export function useStorageViewModel() {
    const [credentials, setCredentials] = useState<Credentials | null>(null)
    const [storageInfo, setStorageInfo] = useState<StorageInfo[]>([])

    async function getCredentials() {
        const cred = await Storage.getCredentials()
        if(cred) setCredentials(cred)
    }

    async function fetchAllInfo() {
        const datasets = fetchDatasetInfo(credentials!.url, credentials!.token)
        const pools = fetchPoolInfo(credentials!.url, credentials!.token)

        Promise.all([datasets, pools]).then(([datasets, pools]) => {
            const info: StorageInfo[] = []

            pools.forEach(pool => {
                info.push({
                    pool: pool,
                    poolDataset: datasets.filter(dataset => dataset.mountpoint == pool.path)[0]
                })
            })

            setStorageInfo(info)
        })
    }

    useEffect(() => {
        getCredentials()
    }, [])
    
    useEffect(() => {
        if(!credentials) return

        fetchAllInfo()
    }, [credentials])

    return {
        storageInfo
    }
}

  
  
  