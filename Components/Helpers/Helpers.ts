export function toSize(bytes: number): string {
    const kilobytes = bytes / 1024
    if(kilobytes < 1) return `${Math.round(bytes*10)/10} Bytes`

    const megabytes = kilobytes / 1024
    if(megabytes < 1) return `${Math.round(kilobytes*10)/10} KiB`

    const gigabytes = megabytes / 1024
    if(gigabytes < 1) return `${Math.round(megabytes*10)/10} MiB`

    const terabytes = gigabytes / 1024
    if(terabytes < 1) return `${Math.round(gigabytes*10)/10} GiB`

    return `${Math.round(terabytes*10)/10} TiB`
}

export function toTime(seconds: number) {
    seconds = Math.floor(seconds)

    const days = Math.floor(seconds/(24*3600))
    const hours = Math.floor((seconds % (24*3600)) / 3600)
    const minutes = Math.floor(seconds % 3600 / 60)
    const seconds1 = Math.floor(seconds % 60)

    return `${days}d ${hours}h ${minutes}m`
}

export function colorWithOpacity(hexColor: string = "#000000", opacity: number): string {
    let expandedOpacity = Math.round(opacity * 255)
    let opacityHex: string = ""
    const hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]


    while(expandedOpacity != 0) {
        const quotient = Math.floor(expandedOpacity / 16)
        const remainder = expandedOpacity % 16

        opacityHex = hexValues[remainder] + opacityHex
        expandedOpacity = quotient
    }

    return hexColor + opacityHex
}

export function shortenString(str: string, maxLength: number): string {
    if(maxLength < str.length) {
        return str.substring(0, maxLength) + "..."
    }

    return str
}