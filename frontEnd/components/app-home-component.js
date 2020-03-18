class AppHomeComponent extends ZexalComponent {

    _data = null;
    _style = "frontEnd/components/app-home-component.css";

    _render() {
        var ret = document.createElement('div');
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
}
customElements.define("app-home", AppHomeComponent);