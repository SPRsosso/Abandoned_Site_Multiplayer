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

expressApp.get("/", ( req, res ) => {
    res.sendFile(path.join(__dirname, "..", "index.html"));
});

server.listen(3000, "127.0.0.1", () => {
    const address = server.address() as { port: number }
    console.log("Listening on port: " + address.port);
});

io.on("connection", ( socket: Socket ) => {
    console.log("User connected with IP:", socket.handshake.address);
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
            nodeIntegration: true,
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