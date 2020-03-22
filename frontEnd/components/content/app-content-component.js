import {
    ConfigTabComponent,
    CorsiTabComponent,
    ContabilitaTabComponent
} from './primary-tab-component.js';

import { ConfigDatiComponent } from './config/config-dati-component.js';
import { CorsiElencoComponent } from './corsi/corsi-elenco-component.js';
import {
    TipoEntrateComponent,
    TipoUsciteComponent
} from './contabilita/tipo-component.js';
import { AddUscitaComponent } from './contabilita/add-uscita-component.js';
import { ListaMovimentiComponent } from './contabilita/lista-movimenti-component.js';

export class AppContentComponent extends ZexalComponent {

    constructor() {
        super();
        this.setAttribute("url", "/home");
    }

    static get observedAttributes() {
        return ['url'];
    }

    _render() {
        var div = document.createElement("div");
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
            case "/corsi/elenco":
                screen = new CorsiElencoComponent();
                break;
            case "/contabilita":
                screen = new ContabilitaTabComponent();
                break;
            case "/contabilita/tipoentrate":
                screen = new TipoEntrateComponent();
                break;
            case "/contabilita/tipouscite":
                screen = new TipoUsciteComponent();
                break;
            case "/contabilita/spesa":
                screen = new AddUscitaComponent();
                break;
            case "/contabilita/movimenti":
                screen = new ListaMovimentiComponent();
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