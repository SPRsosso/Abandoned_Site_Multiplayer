import { FileStream } from "../public/filestream.js";

export class Component extends HTMLElement {
    name: string;
    shadow: ShadowRoot;

    constructor(name: string) {
        super();
        this.name = name;

        this.shadow = this.attachShadow({ mode: "open" });

        this.render();
    }

    render() {
        FileStream.readFileAsync(`${this.name}.html`).then((data) => {
            let textHTML = "";
            textHTML = `<link rel="stylesheet" href="./css/style.css">`;
            textHTML += `<link rel="stylesheet" href="./css/${this.name}/style.css">`;
            textHTML += data;

            this.shadow.innerHTML = textHTML;

            this.init();
        });
    }

    init() {
        throw new Error("init() is not overriden!");
    }
}