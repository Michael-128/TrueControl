import { useEffect, useState } from "react"
import { Credentials, Storage } from "../Components/Storage/Storage"
import { SystemInfo } from "../Models/SystemInfo"
import { ProcessorInfo } from "../Models/ProcessorInfo"
import { MemoryInfo } from "../Models/MemoryInfo"
import { DatasetInfo } from "../Models/DatasetInfo"
import { NetworkInterfaceInfo } from "../Models/NetworkInterfaceInfo"
import { fetchDatasetInfo, fetchInfo, fetchWSInfo } from "../Views/OverviewScreen/OverviewLogic"
import { TrueNasWSStatic } from "../Components/Helpers/TrueNasWS"
import { useTrueNas } from "../Hooks/useTrueNas"
import TrueNasService from "../Services/TrueNasService"

function useOverviewViewModel() {
 
}

export default useOverviewViewModel

