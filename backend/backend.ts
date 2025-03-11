const { app, BrowserWindow } = require("electron");
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const expressApp = express();
const server = createServer(expressApp);
const io = new Server(server);

let browserWindow;

server.listen(3000);

function createWindow() {
    browserWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });

    browserWindow.loadFile("./index.html");
}

app.whenReady().then(() => createWindow());
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});