class SidebarItemComponent extends ZexalComponent {

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
        this.querySelector('span').addEventListener('click', function() {
            document.querySelector("app-sidebar").setRouter(url);
        })
    };
    _render() {
        return '<span>' + this._text + '</span>';
    }
}
customElements.define("sidebar-item", SidebarItemComponent);