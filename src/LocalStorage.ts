let deviceId:string|null = null;

export function storeDeviceId(_deviceId: string) {
    // store into local storage
    deviceId = _deviceId;
    localStorage.setItem("deviceId", deviceId);
}
export function readDeviceId(): string{
    // get from local storage
    if(!deviceId){
        deviceId = localStorage.getItem("deviceId") || "";
    }
    return deviceId;
}