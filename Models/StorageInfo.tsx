import { DatasetInfo } from "./DatasetInfo"
import { PoolInfo } from "./PoolInfo"

export interface StorageInfo {
    pool: PoolInfo
    poolDataset: DatasetInfo
}