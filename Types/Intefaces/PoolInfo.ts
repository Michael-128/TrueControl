export interface PoolInfo {
    id: number
    name: string
    free: number
    size: number
    healthy: boolean
    status: string
    status_detail: string
    path: string
    scan: {
        errors: number
    }
}