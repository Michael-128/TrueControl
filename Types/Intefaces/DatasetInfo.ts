export interface DatasetInfo {
    id: string
    name: string
    available: {
        parsed: number
    }
    used: {
        parsed: number
    }
}