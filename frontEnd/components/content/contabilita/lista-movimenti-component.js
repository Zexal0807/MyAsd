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
            url: "/userFunction",
            data: { id: 8 },
            dataType: "json",
            success: function() {
                $.ajax({
                    type: "POST",
                    url: "/getMovimenti",
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
        <table class="table table-striped">
            <tr>
                <th>Data</th>
                <th>Riferimento</th>
                <th>Tipologia</th>
                <th>Descizione</th>
                <th>Entrate</th>
                <th>Uscite</th>
            </tr>`;

        this._data.movimenti.forEach(el => {
            r += `<tr>
                    <td>` + el.data + `</td>
                    <td>` + el.cartaceo + `</td>
                    <td>` + el.tipo + `</td>
                    <td>` + el.descrizione + `</td>
                    <td>` + (el.entrate == null ? "" : el.entrate + "€") + `</td>
                    <td>` + (el.uscite == null ? "" : el.uscite + "€") + `</td>
                </tr>`;
        });
        r += `<tr>
                <th></th>
                <th></th>
                <th></th>
                <th>Tot</th>
                <th>` + this._data.cassa.entrate + `€</th>
                <th>` + this._data.cassa.uscite + `€</th>
            </tr>
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>Tot</th>
                <th>` + (Number(this._data.cassa.entrate) + Number(this._data.cassa.uscite)) + `€</th>
            </tr>
        </table>`;

        return r;
    }
}
customElements.define("lista-movimenti", ListaMovimentiComponent);