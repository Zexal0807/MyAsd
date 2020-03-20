import { AppLoginComponent } from './app-login-component.js';
import { AppHomeComponent } from './app-home-component.js';

class AppComponent extends ZexalComponent {

    _data = null;

    connectedCallback() {
        this.render();
        const self = this;
        $.ajax({
            type: "POST",
            url: "getUserData",
            data: {},
            dataType: "json",
            success: function(s) {
                self._data = s;
                self.render();
            },
            error: function(e) {
                self._data = false;
                self.render();
            }
        });
    }

    _render() {
        var screen = null;
        if (this._data == null) {
            return "<div>LOADER</div>";
        } else if (this._data) {
            screen = new AppHomeComponent();
            screen._data = this._data;
        } else {
            screen = new AppLoginComponent();
        }
        return screen;
    }
}
customElements.define("app-root", AppComponent);