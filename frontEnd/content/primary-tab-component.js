class PrimaryTabComponent extends ZexalComponent {

    _icon = ""

    _item = [];

    connectedCallback() {
        this.render();
        const self = this;
        $.ajax({
            type: "POST",
            url: "/getUserData",
            data: {},
            dataType: "json",
            success: function(s) {
                Object.entries(s.funzioni).forEach(function([key, val]) {
                    if (val.url == self._url) {
                        self._item = val.sub;
                        self._icon = val.icon;
                        self.render();
                    }
                });
            },
            error: function(e) {
                self._data = false;
                self.render();
            }
        });
    }

    _render() {
        var self = this;
        var ret = document.createElement("div");

        var div = document.createElement("div");
        div.className = "tab-icon";
        div.innerHTML = this._icon;
        ret.append(div);

        var div = document.createElement("div");
        div.className = "row ml-0 mr-0"
        this._item.forEach(it => {
            div.append(new CardComponent(it.nome, it.descrizione, "/" + self._url + "/" + it.url));
        });
        ret.append(div);

        return ret;
    }
}

class CardComponent extends ZexalComponent {

    constructor(text, desc, url) {
        super();
        this._text = text;
        this._desc = desc;
        this._url = url;
    }

    _render() {
        this.className = "col-6 col-md-4 pl-2 pr-2"

        var ret = document.createElement("div");
        var div = document.createElement("div");
        div.className = "card mb-3";

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

export class HomeTabComponent extends PrimaryTabComponent {
    _url = 'home';
}
customElements.define("home-tab", HomeTabComponent);

export class ConfigTabComponent extends PrimaryTabComponent {
    _url = 'config';
}
customElements.define("config-tab", ConfigTabComponent);

export class CorsiTabComponent extends PrimaryTabComponent {
    _url = 'corsi';
}
customElements.define("corsi-tab", CorsiTabComponent);

export class ContabilitaTabComponent extends PrimaryTabComponent {
    _url = 'contabilita';
}
customElements.define("contabilita-tab", ContabilitaTabComponent);

export class IscrittiTabComponent extends PrimaryTabComponent {
    _url = 'iscritti';
}
customElements.define("iscritti-tab", IscrittiTabComponent);