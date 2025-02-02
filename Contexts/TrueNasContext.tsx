import React, { createContext, useEffect, useState } from 'react';
import { ConnectionStatus } from "../Types/Enums/ConnectionStatus";
import { ReactNode } from 'react';
import { SystemInfo } from '../Models/SystemInfo';
import { ProcessorInfo } from '../Models/ProcessorInfo';
import TrueNasService from '../Services/TrueNasService';
import { TrueNasWSStatic } from '../Components/Helpers/TrueNasWS';
import { NetworkInterfaceInfo } from '../Models/NetworkInterfaceInfo';
import { MemoryInfo } from '../Models/MemoryInfo';
import { PoolInfo } from '../Models/PoolInfo';
import { DatasetInfo } from '../Models/DatasetInfo';

interface TrueNasContextType {
    connectionStatus: ConnectionStatus;

    systemInfo: SystemInfo | null;
    processorInfo: ProcessorInfo | null;
    memoryInfo: MemoryInfo | null;
    networkInterfaceInfo: NetworkInterfaceInfo[];
    poolInfo: PoolInfo[];
    datasetInfo: DatasetInfo[];
    
    cpuUsage: number;
    cpuMaxTemp: number;
    
    readSpeed: number;
    writeSpeed: number;
    
    isWSDataLoaded: boolean;
}

export const TrueNasContext = createContext<TrueNasContextType>({
    connectionStatus: ConnectionStatus.DISCONNECTED,
    systemInfo: null,
    processorInfo: null,
    networkInterfaceInfo: [],
    poolInfo: [],
    datasetInfo: [],
    cpuUsage: 0,
    cpuMaxTemp: 0,
    memoryInfo: null,
    readSpeed: 0,
    writeSpeed: 0,
    isWSDataLoaded: false
});


export function TrueNasProvider({ children }: { children: ReactNode }) {
    const tnService = TrueNasService.static;

    const [connectionStatus, setConnectionStatus] = useState(ConnectionStatus.DISCONNECTED);
    const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null)
    const [processorInfo, setProcessorInfo] = useState<ProcessorInfo | null>(null)
    const [memoryInfo, setMemoryInfo] = useState<MemoryInfo | null>(null)
    const [networkInterfaceInfo, setNetworkInterfaceInfo] = useState<NetworkInterfaceInfo[]>([])
    const [poolInfo, setPoolInfo] = useState<PoolInfo[]>([]);
    const [datasetInfo, setDatasetInfo] = useState<DatasetInfo[]>([])
    
    const [cpuUsage, setCpuUsage] = useState(0)
    const [cpuMaxTemp, setCpuMaxTemp] = useState(0)
    
    const [readSpeed, setReadSpeed] = useState(0)
    const [writeSpeed, setWriteSpeed] = useState(0)
    
    const [isWSDataLoaded, setIsWSDataLoaded] = useState(false)

    const [conInterval, setConInterval] = useState<any>(null);

    async function checkConnection() {
        const isConnected = await tnService.checkConnection()

        setConnectionStatus(isConnected ? ConnectionStatus.CONNECTED : ConnectionStatus.DISCONNECTED)
    }

    async function fetchInfo() {
        const { systemInfo, processorInfo } = await tnService.fetchSystemAndProcessorInfo();
        const datasetInfo = await tnService.fetchDatasetInfo();
        const poolInfo = await tnService.fetchPoolInfo();

        setSystemInfo(systemInfo)
        setProcessorInfo(processorInfo)
        setDatasetInfo(datasetInfo)
        setPoolInfo(poolInfo)
    }

    const [intervalIds, setIntervalIds] = useState<any[]>([])

    function clearIntervals() {
        intervalIds.forEach((id) => clearInterval(id))
    }

    function addInterval(fn: () => void, interval: number) { 
        fn()
        const id = window.setInterval(fn, interval)
        setIntervalIds([...intervalIds, id])
    }

    useEffect(() => {
        addInterval(checkConnection, 10000)
        addInterval(fetchInfo, 10000)

        return () => clearIntervals()
    }, [])

    return (
        <TrueNasContext.Provider value={{ connectionStatus, systemInfo, processorInfo, cpuUsage, cpuMaxTemp, memoryInfo, readSpeed, writeSpeed, networkInterfaceInfo, isWSDataLoaded, poolInfo, datasetInfo }}>
                {children}
        </TrueNasContext.Provider>
    );
}