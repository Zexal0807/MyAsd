class SidebarComponent extends ZexalComponent {

    _data = null;
    _style = "frontEnd/components/sidebar-component.css";

    _render() {
        var div = document.createElement("div");
        var tmp = document.createElement("div");
        tmp.className = "sidebar-header";
        div.append(tmp);
        var tmp = document.createElement("ul");
        tmp.className = "sidebar-nav";

        Object.entries(this._data).forEach(function([key, val]) {
            var list = new SidebarListComponent();
            list.setAttribute("open", "1");
            list._icon = val.icon;
            list._text = val.nome;
            list._url = "/" + val.url;
            list._item = val.sub;
            tmp.append(list);
        });
        div.append(tmp);
        return div;
    }
}
customElements.define("app-sidebar", SidebarComponent);