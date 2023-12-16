export default class TrueNasWS {
    static instance = TrueNasWS.instance || new TrueNasWS()
    urlString: string | undefined

    setURL(url: string) {
        this.urlString = url
    }
}