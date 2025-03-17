import { setCanvas } from "../public/canvas.js";
import { Component } from "./component.js";

export class GameAreaComponent extends Component {
    constructor() {
        super("game-area");
    }

    init(): void {
        setCanvas("game-area-canvas");

        document.querySelector("main")!.dispatchEvent(new Event("init-game-area"));
    }
}

customElements.define("game-area", GameAreaComponent);