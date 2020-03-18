class NavbarComponent extends ZexalComponent {

    _username = "";

    _style = "frontEnd/components/navbar-component.css";

	_render() {
        return `
        <nav class="navbar navbar-light">
            <span>` + this._username + `</span>
            <button>
                Esci <i class="fas fa-door-open"></i>
            </button>
        </nav>`;
	}
}
customElements.define("app-navbar", NavbarComponent);