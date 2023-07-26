import type { Server } from "@/Server";

export interface IClientGadget {
    setServer(server: Server): void;

}