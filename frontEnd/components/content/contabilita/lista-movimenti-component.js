export class ListaMovimentiComponent extends ZexalComponent {

    _data = {
        cassa: 0,
        movimenti: []
    };

    connectedCallback() {
        const self = this;
        self.render();
        $.ajax({
            type: "POST",
            url: "userFunction",
            data: { id: 8 },
            dataType: "json",
            success: function() {
                $.ajax({
                    type: "POST",
                    url: "getMovimenti",
                    data: {},
                    dataType: "json",
                    success: function(s) {
                        self._data = s;
                        self.render();
                    },
                    error: function(e) {
                        console.log(e);
                    }
                });
            },
            error: function(e) {
                console.log(e);
            }
        });
    }

    _render() {
        var r = `
            CASSA : ` + this._data.cassa;
        r += `<br><br>`;
        this._data.movimenti.forEach(el => {
            r += `(` + el.id + `) ` + el.data + `: ` + el.tipo + " - " + el.descrizione + " " + el.importo + `€ <br>`;
        });
        return r;
    }
}
customElements.define("lista-movimenti", ListaMovimentiComponent);