export interface NetworkInterfaceInfo {
    name: string
    link_state: string,
    received_bytes: number,
    received_bytes_rate: number,
    sent_bytes: number,
    sent_bytes_rate: number,
    speed: number
}