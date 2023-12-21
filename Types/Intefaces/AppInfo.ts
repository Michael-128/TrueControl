export interface AppInfo {
    id: string
    name: string
    info: {
        status: string
    }
    chart_metadata: {
        icon: string
        description: string
    }
    catalog: string
    status: string
    update_available: boolean
}