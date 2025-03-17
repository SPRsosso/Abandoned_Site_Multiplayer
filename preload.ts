const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("contextBridge", {
    closeApp: () => ipcRenderer.invoke("close-app"),
    createNewGame: ( name: string ) => ipcRenderer.invoke("create-new-game", name),
    getPort: ( callback: ( port: number ) => void ) => ipcRenderer.on('send-port', ( event: any, data: number ) => callback(data)),
    doesServerExist: async ( url: string, callback: ( exists: boolean ) => void ): Promise<void> => {
        return new Promise<void>(( resolve, reject ) => {
            ipcRenderer.invoke("check-server-existance", url);
            ipcRenderer.on("server-exists", ( event: any, exists: boolean ) => {
                callback(exists)
                resolve();
            });
        });
    }
});