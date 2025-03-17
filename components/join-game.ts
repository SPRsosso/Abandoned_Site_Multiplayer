import { connect } from "../public/socket.js";
import { Component } from "./component.js";

export class JoinGameComponent extends Component {
    constructor() {
        super("join-game");
    }

    init() {
        this.shadow.querySelector(".cancel-btn")?.addEventListener("click", () => {
            document.querySelector("main")!.innerHTML = "<main-menu></main-menu>";
        });
        
        const joinBtn = this.shadow.querySelector(".join-btn");
        const errorEl = this.shadow.querySelector<HTMLElement>(".error")!;
        let canClick = true;

        joinBtn?.addEventListener("click", async () => {
            if (!canClick) return;
            
            errorEl.innerHTML = "";

            const input = this.shadow.querySelector<HTMLInputElement>(".address-input");
            if (!input) {
                document.querySelector("main")!.innerHTML = "<error-page></error-page>";
                return;
            }

            joinBtn.classList.add("inactive");
            canClick = false;

            try {
                const message = await connect(input.value);

                document.querySelector("main")!.innerHTML = "<game-area></game-area>";
            } catch(error: any) {
                errorEl.innerHTML = error;
            }

            joinBtn.classList.remove("inactive");
            canClick = false;
        });
    }
}

customElements.define("join-game", JoinGameComponent);