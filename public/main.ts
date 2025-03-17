import { MainMenuComponent } from "../components/main-menu.js";
import { NewGameComponent } from "../components/new-game.js";
import { ErrorPageComponent } from "../components/error-page.js";
import { connect } from "./socket.js";
import { GameAreaComponent } from "../components/game-area.js";
import { MessageBoxComponent } from "../components/message-box.js";
import { JoinGameComponent } from "../components/join-game.js";

declare global {
    interface Window {
        contextBridge: { [key: string]: any };
    }
}

window.contextBridge.getPort(async ( port: number ) => {
    console.log(`Port: ${port}`);
    try {
        const message = await connect("localhost:" + port);

        document.querySelector("main")!.innerHTML = "<game-area></game-area>";
    } catch(error) {
        document.querySelector("main")!.innerHTML = `<error-page error="${error}"></error-page>`;
    }
});



function init() {
    MainMenuComponent;
    NewGameComponent;
    ErrorPageComponent;
    GameAreaComponent;
    MessageBoxComponent;
    JoinGameComponent;
}
init();