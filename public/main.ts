// @ts-ignore
import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";
import { Socket } from "socket.io";

declare global {
    interface Window {
        contextBridge: { [key: string]: any };
    }
}

const socket: Socket = io("http://localhost:3000");

socket.on("connect", async () => {
    const socketInfo = document.querySelector("#socket-info");
    if (socketInfo) {
        socketInfo.innerHTML = "Connected as " + socket.id;
    }

    const response = await window.contextBridge.ping("pong");
    document.write(response);
    const response2 = await window.contextBridge.ping("ping");
    document.write(response2);
});
