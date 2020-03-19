class SidebarComponent extends ZexalComponent {

    _data = null;
    _style = "frontEnd/components/sidebar-component.css";

    _render() {
        var div = document.createElement("div");
        var tmp = document.createElement("div");
        tmp.innerHTML = "QUESTO é L?HEADER"
        tmp.className = "sidebar-header";
        div.append(tmp);
        var tmp = document.createElement("ul");
        tmp.className = "sidebar-nav";

        tmp.append(new SidebarListComponent("/home", "Home", "", [], true));

        Object.entries(this._data).forEach(function([key, val]) {
            tmp.append(new SidebarListComponent("/" + val.url, val.nome, val.icon, val.sub));
        });
        div.append(tmp);
        return div;
    }
}
customElements.define("app-sidebar", SidebarComponent);