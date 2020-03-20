export class PrimaryTabComponent extends ZexalComponent {

    _icon = ""

    _item = [];

    _render() {

        var ret = document.createElement("div");
        ret.innerHTML = this._icon;

        var div = document.createElement("div");
        div.className = "card-deck"
        this._item.forEach(it => {
            div.append(new CardComponent(it.text, it.desc, it.url));
        });
        ret.append(div);

        return ret;
    }
}
customElements.define("primary-tab", PrimaryTabComponent);

class CardComponent extends ZexalComponent {

    constructor(text, desc, url) {
        super();
        this._text = text;
        this._desc = desc;
        this._url = url;
    }

    _render() {
        var ret = document.createElement("div");
        var div = document.createElement("div");
        div.className = "card";

        var div2 = document.createElement("div");
        div2.className = "card-body";
        div2.innerHTML = `
            <h5 class="card-title">` + this._text + `</h5>
            <p class = "card-text" >` + this._desc + `</p>
        `;
        var a = document.createElement("a");
        a.className = "btn btn-primary";
        a.innerHTML = "Vai";
        a.addEventListener("click", function() {
            document.querySelector('app-sidebar').setRouter(this._url);
        }.bind(this));
        div2.append(a);
        div.append(div2);
        ret.append(div);

        return ret;
    }
}
customElements.define("tab-card", CardComponent);