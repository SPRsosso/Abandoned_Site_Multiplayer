import { app, BrowserWindow, ipcMain, IpcMainEvent, IpcMainInvokeEvent } from "electron";
import express from "express";
import { createServer, get } from "http";
import { Server, Socket } from "socket.io";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import dns from "dns";

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

const players: { [key: string]: any } = {};

io.on("connection", ( socket: Socket ) => {
    console.log("User connected with IP:", socket.handshake.address);
    players[socket.handshake.address] = {};

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