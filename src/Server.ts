import type { Message, MessageWithDeviceId } from './Message';
import { HidGadget } from './gadget/HidGadget';
import type { IClientGadget } from './gadget/IClientGadget';


export class Server {
    private static _instance: Server | undefined;
    public static getInstance() {
        if (this._instance === undefined) {
            this._instance = new Server();
        }
        return this._instance;
    }
    private mode: "standalone" | "relay" | undefined;
    private deviceId: string | undefined;
    private ws: WebSocket | undefined;
    private finalized:boolean = false;
    private gadgets:IClientGadget[] = [];

    
    public getGadget<T extends IClientGadget>(type:{new():T}):T{
        let gadget = this.gadgets.find(gadget=>gadget instanceof type);
        if(gadget === undefined){
            gadget = new type();
            gadget.setServer(this);
            this.gadgets.push(gadget);
        }
        return gadget as T;
    }
    
    public getMode(){
        return this.mode;
    }
    public setMode(mode:"standalone" | "relay" | undefined){
        this.mode = mode;
    }
    public getDeviceId(){
        return this.deviceId || "";
    }
    public setDeviceId(deviceId:string){
        this.deviceId = deviceId;
    }
    public async init() {
        
        let {mode,DeviceId} = await getServerModeInfo();
        this.setMode(mode);
        if(mode === "standalone"){
            this.setDeviceId(DeviceId);
        }else{
            let storedDeviceId = localStorage.getItem("deviceId");
            if(storedDeviceId !== null){
                this.setDeviceId(storedDeviceId);
            }
        }
            
        this.openWebsocket();
    }


    public finalize(){
        this.finalized = true;
        this.ws?.close();
    }
    private openWebsocket(){
        if(this.finalized) return;
        this.ws?.close();
        this.ws = new WebSocket("ws://" + window.location.host + "/api/ws");
        this.ws.onclose = () => {
            if(this.finalized) return;
            setTimeout(()=>{this.openWebsocket()}, 1000);
        }
    }
    public sendMessage(message:Message) {
        let message1 = message as MessageWithDeviceId;
        message1.DeviceId = this.deviceId as string;
        this.ws?.send(JSON.stringify(message1));
    }
    public on(type:string,handler:(message:Message)=>void){
        let _handler = (e: { data: string; })=>{
            let message = JSON.parse(e.data) as Message;
            if(message.type == type){
                handler(message);
            }
        }
        this.ws?.addEventListener("message",_handler,{once:true});
        return _handler;
    }
    public once(type:string,handler:(message:Message)=>void){
        let _handler = (e: { data: string; })=>{
            let message = JSON.parse(e.data) as Message;
            if(message.type == type){
                handler(message);
            }
        }
        this.ws?.addEventListener("message",_handler,{once:true});
        return _handler;
    } 
    public off(_handler: (e: { data: string; }) => void){
        this.ws?.removeEventListener("message",_handler);
    }
}

export async function getServerModeInfo() {
    let resp = await (await fetch("/api/mode")).json();
    return resp.data
}

