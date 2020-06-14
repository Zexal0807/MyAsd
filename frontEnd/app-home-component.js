import { AppAlertComponent } from './app-alert-component.js';
import { SidebarComponent } from './sidebar/sidebar-component.js';
import { NavbarComponent } from './navbar/navbar-component.js';
import { AppContentComponent } from './content/app-content-component.js';

import { DatiIscrittoComponent } from './content/iscritti/dati-iscritto-component.js'

export class AppHomeComponent extends ZexalComponent {

    _data = null;

    _render() {
        var ret = document.createElement('div');
        ret.append(new AppAlertComponent());
        var sidebar = new SidebarComponent();
        sidebar._data = this._data.funzioni;
        ret.append(sidebar);

        const div = document.createElement('div');
        var navbar = new NavbarComponent();
        navbar._username = this._data.username;
        div.append(navbar);

        var content = new AppContentComponent();
        div.append(content);

        ret.append(div);

        return ret;
    }

    _addEvent() {
        if (location.search.length > 1) {
            var screen = null;
            var url = new URL(location.href);

            var search = new URLSearchParams(location.search);
            var comp = search.get('comp');

            if (comp != null) {
                switch (comp) {
                    case "dati-iscritto":
                        let id = search.get('c1');
                        if (id != null) {
                            screen = new DatiIscrittoComponent(id);
                        }
                        break;
                }
            }
            window.history.replaceState("", "", url.pathname);
            $('app-content > div').html("");
            $('app-content > div').append(screen);
        }

    }
}
customElements.define("app-home", AppHomeComponent);