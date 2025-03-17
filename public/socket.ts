// @ts-ignore
import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";
import { Socket } from "socket.io";
import { GameAreaComponent } from "../components/game-area";
import { removeEventListeners } from "./remove-event-listeners.js";

export let socket: Socket;

export async function connect(url: string): Promise<string | void> {
    let serverExists: boolean | undefined;
    await window.contextBridge.doesServerExist("http://" + url, ( exists: boolean ) => {
        serverExists = exists;
    });

    console.log(serverExists);
    if (!serverExists) {
        return await new Promise(( resolve, reject ) => {
            reject("Cannot connect to server! Server does not exist");
        });
    }
    
    socket = io("http://" + url, {
        transports: ["polling", "websocket"],
        reconnectionAttempts: 5,
        timeout: 5000
    });

    return await initSocket();
}

function initSocket(): Promise<string> {
    return new Promise(( resolve, reject ) => {
        socket.on("connect", () => {
            resolve("Successfully connected to server");
        });

        socket.on("players", ( players: any ) => {
            removeEventListeners(document.querySelector("main")!);
            document.querySelector("main")!.addEventListener("init-game-area", () => {
                const gameArea = document.querySelector<GameAreaComponent>("game-area");
                if (gameArea) {
                    const playersEl = gameArea.shadowRoot?.querySelector(".players")!;
                    playersEl.innerHTML = Object.keys(players).map(player => `<p>${player}</p>`).join("");
                }
            });
        });
    
        socket.on("connect_error", (error) => {
            socket.disconnect();
            reject(error.message);
        });

        socket.on('connect_failed', (error) => {
            reject(error.message);
        });
    });
    
}