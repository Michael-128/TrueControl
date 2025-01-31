export interface MemoryInfo {
    classes: {
        apps: number
        arc: number
        cache: number
        unused: number
        buffers: number
        page_tables: number
        slab_cache: number
    }
    swap: {
        total: number
    }
}

/*"memory": {
    "classes": {
        "apps": 7347402832,
        "arc": 50388322224,
        "buffers": 9555968,
        "cache": 2052648960,
        "page_tables": 42987520,
        "slab_cache": 2112397312,
        "swap_cache": 0,
        "unused": 5199335424
    },
    "extra": {
        "active": 522620928,
        "committed": 14980894720,
        "inactive": 8939438080,
        "mapped": 694439936,
        "vmalloc_used": 2122657792
    },
    "swap": {
        "total": 8580284416,
        "used": 0
    }
},*/