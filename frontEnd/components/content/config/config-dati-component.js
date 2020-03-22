export class ConfigDatiComponent extends ZexalComponent {

    _data = [];

    connectedCallback() {
        this.render();
        const self = this;
        $.ajax({
            type: "POST",
            url: "/datiAsd",
            data: {},
            dataType: "json",
            success: function(s) {
                self._data = s;
                self.render();
            },
            error: function(e) {}
        });
    }

    _render() {
        var t = document.createElement("table");

        var tr = document.createElement("tr");
        var th = document.createElement("th");
        th.innerHTML = "CHIAVI";
        tr.append(th)
        th = document.createElement("th");
        th.innerHTML = "VALORI";
        tr.append(th)
        th = document.createElement("th");
        th.innerHTML = "DESCRIZIONE";
        tr.append(th)
        t.append(tr);

        this._data.forEach(element => {
            tr = document.createElement("tr");
            th = document.createElement("th");
            th.innerHTML = element.chiave;
            tr.append(th)
            var td = document.createElement("td");
            td.innerHTML = element.valore;
            tr.append(td)
            td = document.createElement("td");
            td.innerHTML = element.descrizione;
            tr.append(td)
            t.append(tr);
        });
        return t;
    }
}
customElements.define("config-dati", ConfigDatiComponent);