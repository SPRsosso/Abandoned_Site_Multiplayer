import { Component } from "./component.js";

export class ErrorPageComponent extends Component {
    constructor() {
        super("error-page");
    }

    init(): void {
        const errorMessage = this.getAttribute("error");
        if (errorMessage) {
            this.shadow.querySelector(".error")!.innerHTML = errorMessage;
        }

        this.shadow.querySelector(".return-btn")?.addEventListener("click", () => {
            document.querySelector("main")!.innerHTML = "<main-menu></main-menu>";
        });
    }
}

customElements.define("error-page", ErrorPageComponent);