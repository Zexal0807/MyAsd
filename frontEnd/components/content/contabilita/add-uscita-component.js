export class AddUscitaComponent extends ZexalComponent {

    _style = "frontEnd/components/content/contabilita/add-uscita-component.css";

    _data = {
        data: new Date().toISOString().slice(0, 10),
        importo: 35.00,
        tipoUscita: 1,
        descrizione: "",
        cartaceo: ""
    };

    _tipoUscite = [];

    connectedCallback() {
        const self = this;
        $.ajax({
            type: "POST",
            url: "/userFunction",
            data: { id: 8 },
            dataType: "json",
            success: function() {
                $.ajax({
                    type: "POST",
                    url: "/getTipoUscite",
                    data: {},
                    dataType: "json",
                    success: function(s) {
                        self._tipoUscite = s;
                        self.render();
                        self.addEvent();
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

    addEvent() {
        const self = this;
        $(this.querySelectorAll('*[name]')).on("change keyup keydown", function() {
            self._data[$(this).attr("name")] = this.value;
        });
        this.querySelector('form').addEventListener('submit', function(e) {
            self.sendData(e);
        });
    }

    sendData(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/addSpesa",
            data: this._data,
            dataType: "json",
            success: function(s) {
                debugger;
                document.querySelector("app-content").connectedCallback();
            },
            error: function(e) {
                debugger;
                console.log(e);
                document.querySelector("app-content").connectedCallback();
            }
        });
    }

    _render() {
        var self = this;
        var r = `<center>
            <form>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Data spesa</label>
                    <div class="col-sm-4">
                        <input type="date" class="form-control" name="data" required value="` + this._data.data + `">
                    </div>
                    <label class="col-sm-2 col-form-label">Rif. cartaceo</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" name="cartaceo" required value="` + this._data.cartaceo + `">
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Importo</label>
                    <div class="col-sm-3">
                        <input type="number" step="0.01" class="form-control" name="importo" required value="` + this._data.importo + `">
                    </div>
                    <label class="col-sm-2 col-form-label">Tipo Spesa</label>
                    <div class="col-sm-5">
                        <select class="form-control col-sm-12" name="tipoUscita">`;
        this._tipoUscite.forEach(el => {
            r += `<option value="` + el.id + `" ` + (self._data.tipoUscita == el.id ? "selected" : "") + `>` + el.descrizione + `</option>`;
        });
        r += `</select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Descrizione</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" name="descrizione" required value="` + this._data.descrizione + `">
                    </div>
                </div>
                <button type="submit" class="btn btn-primary mb-2">Aggiungi spesa</button>
            </form>
        </center>`;
        return r;
    }
}
customElements.define("add-uscita", AddUscitaComponent);