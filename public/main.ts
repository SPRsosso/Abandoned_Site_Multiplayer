// @ts-ignore
import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";
import { Socket } from "socket.io";
import { FileStream } from "./filestream.js";

declare global {
    interface Window {
        contextBridge: { [key: string]: any };
    }
}

async function mainMenu() {
    const mainEl = document.querySelector("main")!;
    
    const page = await FileStream.readFileAsync("main-menu.html");
    mainEl.innerHTML = page;
}

await mainMenu();

const newGameEl = document.querySelector("#new-game-btn");
newGameEl?.addEventListener("click", () => {
    
})