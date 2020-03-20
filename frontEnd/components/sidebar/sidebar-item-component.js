export class SidebarItemComponent extends ZexalComponent {

    _url = "";
    _text = "";

    constructor(url, text) {
        super();
        this._url = url;
        this._text = text;
    }

    connectedCallback() {
        super.connectedCallback();
        var url = this._url;
        this.querySelector('div').addEventListener('click', function() {
            document.querySelector("app-sidebar").setRouter(url);
        })
    };
    _render() {
        return '<div>' + this._text + '</div>';
    }
}
customElements.define("sidebar-item", SidebarItemComponent);