class SidebarListComponent extends ZexalComponent {

    _icon = '<i class="fa fa-users"></i>';

    _text = "Products";
    _url = "/home"

    _item = [
        { text: "Add new", url: "/home/a" },
        { text: "Add cat", url: "/home/h" }
    ];

    static get observedAttributes() {
        return ['open'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
        this.querySelector('i[data-toggle="collapse"]').addEventListener('click', this.toggleOpen.bind(this));
    }

    get open() {
        return this.getAttribute("open");
    }

    set open(val) {
        this.setAttribute("open", val);
    }

    toggleOpen() {
        if (this.open == "1") {
            this.open = "0";
        } else {
            this.open = "1";
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.querySelector('i[data-toggle="collapse"]').addEventListener('click', this.toggleOpen.bind(this));
    }

    _render() {

        var li = document.createElement("li");
        li.innerHTML = this._icon;

        var item = new SidebarItemComponent();
        item._text = this._text;
        item._url = this._url;
        li.append(item);

        var i = document.createElement("i");
        i.setAttribute("data-toggle", "collapse")
        i.className = "fa fa-users";
        li.append(i);

        var ul = document.createElement("ul");
        ul.className = "panel-collapse collapse panel-switch " + (this.open == "1" ? "show" : "");
        this._item.forEach(it => {
            var item = new SidebarItemComponent();
            item._text = it.text;
            item._url = it.url;

            var tmp = document.createElement("li");
            tmp.append(item);

            ul.append(tmp);
        });
        li.append(ul);

        return li;
    }

}
customElements.define("sidebar-list", SidebarListComponent);

class SidebarItemComponent extends ZexalComponent {

    _url = "/home";

    _text = "Products";

    changeRouter() {
        document.querySelector("app-content").setAttribute("url", this._url)
    }

    connectedCallback() {
        super.connectedCallback();
        this.querySelector('span').addEventListener('click', this.changeRouter.bind(this));
    }
    _render() {
        return `<span>Users</span>`;
    }
}
customElements.define("sidebar-item", SidebarItemComponent);