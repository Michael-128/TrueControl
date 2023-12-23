import { sleep } from "./Helpers"
import { v4 as uuid } from 'uuid';

export class TrueNasWS {

    shellWS: WebSocket
    ws: WebSocket
    isConnected = false
    isAuthenticated = false
    session = ""
    url = ""

    onStats = (stats: any) => {}
    nextStats = (stats: any) => {}

    onScale = (currentScale: number) => {}

    sendConnect() {
        this.ws.send(JSON.stringify({
            "msg": "connect",
            "version": "1",
            "support": ["1"]
        }))
    }

    sendShellConnect() {
        this.ws.send(JSON.stringify({
            id: uuid(),
            msg: "method",
            method: "auth.generate_token"
        }))
    }

    listenShellConnect(json: any) {
        if(!json.hasOwnProperty("result")) return
        if(typeof json.result != "string") return

        this.initShell(json.result)
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

    onShellMessage = (msg: string) => {}

    initShell(token: string) {
        //this.shellWS = new WebSocket(this.url.replace("https://", "wss://").replace("http://", "ws://")+"/websocket/shell/")
        this.shellWS = new WebSocket("ws://192.168.1.50:81/websocket/shell/")
        this.shellWS.binaryType = "blob"

        this.shellWS.onopen = () => {
            this.shellWS.send(JSON.stringify({token: token}))
        }

        const reader = new FileReader();

        this.shellWS.onmessage = (msg: MessageEvent) => {
            if (msg.data instanceof Blob) {
                reader.onload = () => {
                    this.onShellMessage(reader.result as string)
                };
        
                reader.readAsText(msg.data);
            }
        }

        this.shellWS.onerror = (e) => {
            console.error(e)
        }

        this.shellWS.onclose = (e) => {
            console.warn(e)
        }
    }

    init(url: string, username: string, password: string) {
        this.ws = new WebSocket(url.replace("https://", "wss://").replace("http://", "ws://")+"/websocket")

        this.url = url

        this.ws.onopen = () => {
            this.sendConnect()
        }

        this.ws.onmessage = (e) => {
            try {
                const json = JSON.parse(e.data)

                this.listenConnect(json, () => {
                    this.ws.send(JSON.stringify({
                        "id": uuid(),
                        "msg": "method",
                        "method": "auth.login",
                        "params": [username, password]
                    }))
                })

                this.listenAuth(json, () => {
                    this.ws.send(JSON.stringify({"id": uuid(), name: "reporting.realtime", msg: "sub"}))
                })

                this.listenRealtimeStats(json, (stats) => {
                    this.onStats(stats)
                    this.nextStats(stats)
                })

                this.listenShellConnect(json)
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

export const TrueNasWSStatic = new TrueNasWS()