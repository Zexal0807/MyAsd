class SidebarItemComponent extends ZexalComponent {

    _url = "";
    _text = "";

    constructor(url, text) {
        super();
        this._url = url;
        this._text = text;
    }

    changeRouter() {
        document.querySelector("app-content").setAttribute("url", this._url);
        document.querySelectorAll("app-sidebar li").forEach(ele => {
            ele.className = "";
        })
        this.parentElement.className = "selected";
        if (this.parentElement.parentElement.parentElement.tagName == "LI") {
            this.parentElement.parentElement.parentElement.className = "selected";
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.querySelector('span').addEventListener('click', this.changeRouter.bind(this));
    }
    _render() {
        return '<span>' + this._text + '</span>';
    }
}
customElements.define("sidebar-item", SidebarItemComponent);