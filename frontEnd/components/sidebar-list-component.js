class SidebarListComponent extends ZexalComponent {

    _url = ""
    _text = "";
    _icon = "";
    _item = [];

    _open = true;

    constructor(url, text, icon, item, selected = false) {
        super();
        this._url = url;
        this._text = text;
        this._icon = icon;
        this._item = item;
        this._selected = selected;
    }

    toggleOpen() {
        this._open = !this._open;
        $(this.querySelector(".panel-collapse")).slideToggle();
        this.querySelector('i[data-toggle="collapse"]').className = (this._open ? "far fa-arrow-alt-circle-up" : "far fa-arrow-alt-circle-down");
    }

    connectedCallback() {
        super.connectedCallback();
        this.querySelector('i[data-toggle="collapse"]').addEventListener('click', this.toggleOpen.bind(this));
    }

    _render() {
        var li = document.createElement("li");
        if (this._selected) {
            li.className = "selected";
        }
        li.append(new SidebarItemComponent(this._url, this._text));

        var i = document.createElement("i");
        i.setAttribute("data-toggle", "collapse")
        i.className = (this._open ? "far fa-arrow-alt-circle-up" : "far fa-arrow-alt-circle-down");
        if (this._item.length == 0) {
            i.classList.toggle("hide");
        }
        li.prepend(i);

        var ul = document.createElement("ul");
        ul.className = "panel-collapse collapse panel-switch " + (this._open ? "show" : "");
        var temp = this._url;
        this._item.forEach(it => {
            var tmp = document.createElement("li");
            tmp.append(new SidebarItemComponent(temp + "/" + it.url, it.nome));
            ul.append(tmp);
        });
        li.append(ul);

        return li;
    }

}
customElements.define("sidebar-list", SidebarListComponent);