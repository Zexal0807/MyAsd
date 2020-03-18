class NavbarComponent extends ZexalComponent {

    _username = "";
    _style = "frontEnd/components/navbar-component.css";

    _render() {
        return `
        <nav class="navbar navbar-light">
            <span>` + this._username + `</span>
            <a href="/logout">
                Esci <i class="fas fa-door-open"></i>
            </a>
        </nav>`;
    }
}
customElements.define("app-navbar", NavbarComponent);