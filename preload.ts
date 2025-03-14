const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("contextBridge", {
    ping: ( text: string ) => ipcRenderer.invoke("ping"),
});