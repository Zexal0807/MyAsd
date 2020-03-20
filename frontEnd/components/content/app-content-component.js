import { ConfigTabComponent } from './config/config-tab-component.js';
import { CorsiTabComponent } from './corsi/corsi-tab-component.js';
import { ContabilitaTabComponent } from './contabilita/contabilita-tab-component.js';

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
                screen = new ConfigTabComponent();
                break;
            case "/config/dati":
                screen = new ConfigDatiComponent();
                break;
            case "/corsi":
                screen = new CorsiTabComponent();
                break;
            case "/contabilita":
                screen = new ContabilitaTabComponent();
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