import { sleep } from "../../Components/Helpers/Helpers"

export async function getFetch(url: string, token: string, retry: boolean = true) {
    try {
        const req = await fetch(url, {
            headers: {
                Authorization: token
            }
        })

        return req
    } catch(e) {
        await sleep(3000)
        return await getFetch(url, token, retry)
    }
}

export async function postFetch(url: string, token: string, body: any) {
    try {
        const req = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: token
            },
            body: JSON.stringify(body)
        })

        return req
    } catch(e) {
        console.log(e)
    }
}