export class NavbarComponent extends ZexalComponent {

    _username = "";
    _style = "frontEnd/navbar/navbar-component.css";

    _render() {
        var h = `
        <nav class="navbar navbar-light">`;
        if (isMobile) {
            h += `<i class="fas fa-bars sidehide"></i>`;
        }
        h += `<div>
                <span>` + this._username + `</span>
                <a href="/logout">
                    Esci <i class="fas fa-door-open"></i>
                </a>
            </div>
        </nav>`;
        return h;
    }

    _addEvent() {
        if (isMobile) {
            $('app-sidebar').addClass("hide");
            $('app-navbar i.sidehide').on("click", function() {
                $('app-sidebar').removeClass("hide");
            });
            $('app-content').on("click", function() {
                if (!$('app-sidebar').hasClass("hide")) {
                    $('app-sidebar').addClass("hide");
                }
            });
        }
    }
}
customElements.define("app-navbar", NavbarComponent);