

let _globals: Globals = {
    serverType: undefined,
}

export function getGlobals() {
    return _globals;
}


type Globals = {
    serverType: "standalone" | "relay" | undefined;

}