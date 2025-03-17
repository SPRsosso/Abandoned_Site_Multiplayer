import { Component } from "./component.js";

export class MainMenuComponent extends Component {
    constructor() {
        super("main-menu");
    }

    init(): void {
        this.shadow.querySelector(".new-game-btn")?.addEventListener("click", () => {
            document.querySelector("main")!.innerHTML = "<new-game></new-game>";
        });

        this.shadow.querySelector(".exit-btn")?.addEventListener("click", () => {
            window.contextBridge.closeApp();
        });

        this.shadow.querySelector(".join-game-btn")?.addEventListener("click", () => {
            document.querySelector("main")!.innerHTML = "<join-game></join-game>";
        });
    }
}

customElements.define("main-menu", MainMenuComponent);