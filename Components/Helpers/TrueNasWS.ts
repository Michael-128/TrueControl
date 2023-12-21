import { sleep } from "./Helpers"

export class TrueNasWS {

    ws: WebSocket
    isConnected = false
    isAuthenticated = false
    session = ""

    onStats = (stats: any) => {}
    nextStats = (stats: any) => {}

    sendConnect() {
        this.ws.send(JSON.stringify({
            "msg": "connect",
            "version": "1",
            "support": ["1"]
        }))
    }

    listenConnect(json: any, callback: () => void) {
        if(json.hasOwnProperty("msg") && json.hasOwnProperty("session")) {
            if(json.msg == "connected") {
                this.isConnected = true
                this.session = json.session

                callback()
            } 
        }
    }

    listenAuth(json: any, callback: () => void) {
        if(json.hasOwnProperty("result")) {
            if(json.result == true) {
                this.isAuthenticated = true

                callback()
            } 
        }
    }

    listenRealtimeStats(json: any, callback: (stats: any) => void) {
        if(!json.hasOwnProperty("collection")) return
        if(json.collection != "reporting.realtime") return

        callback(json)
        this.nextStats = () => {}
    }

    close() {
        this.ws.close()
    }

    constructor(url: string, username: string, password: string) {
       this.init(url, username, password)
    }

    init(url: string, username: string, password: string) {
        this.ws = new WebSocket(url.replace("https://", "wss://").replace("http://", "ws://")+"/websocket")

        this.ws.onopen = () => {
            this.sendConnect()
        }

        this.ws.onmessage = (e) => {
            try {
                const json = JSON.parse(e.data)

                this.listenConnect(json, () => {
                    this.ws.send(JSON.stringify({
                        "id": this.session,
                        "msg": "method",
                        "method": "auth.login",
                        "params": [username, password]
                    }))
                })

                this.listenAuth(json, () => {
                    this.ws.send(JSON.stringify({"id": this.session, name: "reporting.realtime", msg: "sub"}))
                })

                this.listenRealtimeStats(json, (stats) => {
                    this.onStats(stats)
                    this.nextStats(stats)
                })
            } catch(err) {
                console.log(err)
            }
        }

        this.ws.onerror = (e) => {
            console.log(e);
        };    
        
        this.ws.onclose = async (e) => {
            await sleep(1000)
            this.init(url, username, password)
        };
    }
}