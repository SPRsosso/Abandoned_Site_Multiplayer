import { Component } from "./component.js";

export class MessageBoxComponent extends Component {
    constructor() {
        super("message-box");
    }

    init(): void {
        const title = this.shadow.host.getAttribute("title");
        const description = this.shadow.host.getAttribute("description");
        let time = this.shadow.host.getAttribute("time");

        if (title) this.shadow.querySelector(".title")!.innerHTML = title;
        if (description) this.shadow.querySelector(".description")!.innerHTML = description;
        if (!time) time = "5000";

        setTimeout(() => {
            this.shadow.host.remove();
        }, parseInt(time));
    }
}

customElements.define("message-box", MessageBoxComponent);