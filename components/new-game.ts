import { Component } from "./component.js";

export class NewGameComponent extends Component {
    constructor() {
        super("new-game");
    }

    init(): void {
        this.shadow.querySelector(".cancel-btn")?.addEventListener("click", () => {
            document.querySelector("main")!.innerHTML = "<main-menu></main-menu>";
        });

        this.shadow.querySelector(".new-game-btn")?.addEventListener("click", () => {
            const input = this.shadow.querySelector<HTMLInputElement>(".game-name-input");
            if (input) {
                if (input.value.length < 3) {
                    this.shadow.querySelector(".error")!.innerHTML = "World name needs to have at least 3 characters";
                    return;
                }

                window.contextBridge.createNewGame();
            } else {
                document.querySelector("main")!.innerHTML = "<error-page></error-page>";
            }
        });
    }
}

customElements.define("new-game", NewGameComponent);