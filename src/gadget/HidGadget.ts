import type { Server } from "@/Server";
import type { IClientGadget } from "./IClientGadget";

export class HidGadget implements IClientGadget{
    private server:Server|undefined;
    setServer(server: Server): void {
        this.server = server;
    }
    sendKey(hid_keyCode: number) {
        this.server?.sendMessage({
            type:"gadget.hid.key",
            data:hid_keyCode
        });
    }
}
