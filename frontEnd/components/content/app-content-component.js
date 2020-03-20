import { PrimaryTabComponent } from './primary-tab-component.js';

import { ConfigDatiComponent } from './config/config-dati-component.js';

export class AppContentComponent extends ZexalComponent {

    _style = "frontEnd/components/content/app-content-component.css";

    constructor() {
        super();
        this.setAttribute("url", "/home");
    }

    static get observedAttributes() {
        return ['url'];
    }

    _render() {
        var div = document.createElement("div");
        div.append(this.getAttribute('url'));
        var screen = null;
        switch (this.getAttribute("url")) {
            case "/config":
                screen = new PrimaryTabComponent();
                screen._icon = "fa fas-gear";
                screen._item = [
                    { url: "/config/dati", text: "Dati Asd", desc: "Gestisci i dati dell'asd" },
                    { url: "/config/dati", text: "Dati Asd", desc: "Gestisci i dati dell'asd" },
                    { url: "/config/dati", text: "Dati Asd", desc: "Gestisci i dati dell'asd" },
                    { url: "/config/dati", text: "Dati Asd", desc: "Gestisci i dati dell'asd" },
                    { url: "/config/dati", text: "Dati Asd", desc: "Gestisci i dati dell'asd" },
                    { url: "/config/dati", text: "Dati Asd", desc: "Gestisci i dati dell'asd" },
                    { url: "/config/dati", text: "Dati Asd", desc: "Gestisci i dati dell'asd" }
                ];
                break;
            case "/config/dati":
                screen = new ConfigDatiComponent();
                break;
            default:
                //screen = new Altro();
                break;
        }
        div.append(screen);
        return div;
    }
}
customElements.define("app-content", AppContentComponent);