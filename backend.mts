import { app, BrowserWindow, ipcMain, IpcMainEvent, IpcMainInvokeEvent } from "electron";
import express from "express";
import { createServer, get } from "http";
import { Server, Socket } from "socket.io";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

import { Encoder } from "./backend/encoder.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const expressApp = express();
const server = createServer(expressApp);
const io = new Server(server, {
    transports: ["polling", "websocket"]
});
let win: BrowserWindow;

expressApp.get("/", (req, res) => {
    res.send("Server is running!");
});

const world = {
    name: "",
}
const players: { [key: string]: any } = {};

io.on("connection", ( socket: Socket ) => {
    const socketIP = Encoder.removePrefix(socket.handshake.address);

    const testIP = "192.168.1.24";
    console.log("Test IP: " + testIP + ", Key: " + world.name);
    const encoded = Encoder.encode(testIP, world.name);
    const decoded = Encoder.decode(encoded, world.name);
    console.log(encoded + ",", decoded)

    console.log("User connected with IP:", socketIP);
    players[socketIP] = {};

    io.emit("players", players);
});

app.commandLine.appendSwitch('enable-autofill');
app.commandLine.appendSwitch('enable-password-generation');

function createWindow() {
    win = new BrowserWindow({
        width: 1200,
        height: 700,
        // fullscreen: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
        }
    });

    win.loadFile("index.html");

    ipcMain.handle('close-app', function () {
        app.quit();
    });

    ipcMain.handle("create-new-game", ( event: IpcMainInvokeEvent, name: string ) => {
        world.name = name;

        server.listen(0, () => {
            const address = server.address() as { port: number }
            console.log("Listening on port: " + address.port);

            win.webContents.send("send-port", address.port);
        });
    });

    ipcMain.handle("check-server-existance", ( event: IpcMainInvokeEvent, url: string ) => {
        const request = get(url, (response) => {
            if (response.statusCode)
                win.webContents.send("server-exists", (response.statusCode < 400));
        });

        request.on("error", (err: any) => {
            win.webContents.send("server-exists", false);
        });

        request.end();
    });
}

app.whenReady().then(() => {
    createWindow();
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
})