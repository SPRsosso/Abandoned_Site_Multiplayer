import { app, BrowserWindow, ipcMain, IpcMainInvokeEvent } from "electron";
import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const expressApp = express();
const server = createServer(expressApp);
const io = new Server(server);

let win;

server.listen(3000, () => {
    console.log("Listening on port :3000");
});

io.on("connection", ( socket: Socket ) => {
    console.log("User connected:", socket.id);
});

app.commandLine.appendSwitch('enable-autofill');
app.commandLine.appendSwitch('enable-password-generation');

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        fullscreen: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        }
    });

    win.loadFile("index.html");

    ipcMain.handle("ping", () => "pong");
}

app.whenReady().then(() => {
    createWindow();
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
})