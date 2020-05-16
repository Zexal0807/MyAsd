import { SidebarListComponent } from './sidebar-list-component.js';

export class SidebarComponent extends ZexalComponent {

    _data = null;
    _style = "frontEnd/sidebar/sidebar-component.css";

    connectedCallback() {
        this.render();
        this.setRouter("/home");
    }

    _render() {
        var div = document.createElement("div");
        var tmp = document.createElement("div");
        tmp.className = "sidebar-header";
        div.append(tmp);
        var tmp = document.createElement("ul");
        tmp.className = "sidebar-nav";

        Object.entries(this._data).forEach(function([key, val]) {
            tmp.append(new SidebarListComponent("/" + val.url, val.nome, val.icon, val.sub));
        });
        div.append(tmp);
        return div;
    }

    setRouter(url) {
        document.querySelector("app-content").setAttribute("url", url);
        this.querySelectorAll('li').forEach(li => {
            li.className = "";
        });

        var elm = this.querySelectorAll('sidebar-item');
        elm.forEach(e => {
            if (url.includes(e._url)) {
                e.parentElement.className = "selected";
            }
        });
        if (isMobile) {
            $(this).addClass("hide");
        }
    }

}
customElements.define("app-sidebar", SidebarComponent);