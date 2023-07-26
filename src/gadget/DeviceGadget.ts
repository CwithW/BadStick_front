import type { Server } from "@/Server";
import type { IClientGadget } from "./IClientGadget";

export class DeviceGadget implements IClientGadget{
    private server:Server|undefined;
    setServer(server: Server): void {
        this.server = server;
    }
    sendExec(command:string){
        this.server?.sendMessage({
            type:"gadget.device.execute_command",
            data:command
        });
    }
}
