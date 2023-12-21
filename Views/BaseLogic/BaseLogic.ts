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