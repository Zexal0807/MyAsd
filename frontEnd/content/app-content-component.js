import {
    HomeTabComponent,
    ConfigTabComponent,
    CorsiTabComponent,
    ContabilitaTabComponent,
    IscrittiTabComponent
} from './primary-tab-component.js';

import { ConfigDatiComponent } from './config/config-dati-component.js';

import { CorsiElencoComponent } from './corsi/corsi-elenco-component.js';
import { AddIscrizioneComponent } from './corsi/add-iscrizione-component.js';
import { AddPagamentoComponent } from './contabilita/add-pagamento-component.js';

import { ConfermaTesseramentoComponent } from './tesseramento/conferma-tesseramento-component.js';

import {
    TipoEntrateComponent,
    TipoUsciteComponent
} from './contabilita/tipo-component.js';
import { AddUscitaComponent } from './contabilita/add-uscita-component.js';
import { ListaMovimentiComponent } from './contabilita/lista-movimenti-component.js';

import {
    ListaSociComponent,
    ListaTesseratiComponent,
    ListaAssociatiComponent
} from './iscritti/lista-iscritti-component.js';

import { DatiIscrittoComponent } from './iscritti/dati-iscritto-component.js';

export class AppContentComponent extends ZexalComponent {

    static get observedAttributes() {
        return ['url'];
    }

    _render() {
        var div = document.createElement("div");
        var screen = null;
        switch (this.getAttribute("url")) {
            case "/home":
                screen = new HomeTabComponent();
                break;
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
            case "/corsi/iscrizione":
                screen = new AddIscrizioneComponent();
                break;
            case "/corsi/pagamento":
                screen = new AddPagamentoComponent();
                break;
            case "/corsi/confermatesseramento":
                screen = new ConfermaTesseramentoComponent();
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
            case "/iscritti":
                screen = new IscrittiTabComponent();
                break;
            case "/iscritti/associati":
                screen = new ListaAssociatiComponent();
                break;
            case "/iscritti/tesserati":
                screen = new ListaTesseratiComponent();
                break;
            case "/iscritti/soci":
                screen = new ListaSociComponent();
                break;
            default:
                this.setAttribute("url", "/home");
                break;
        }
        div.append(screen);
        return div;
    }
}
customElements.define("app-content", AppContentComponent);