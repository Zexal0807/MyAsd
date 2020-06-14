export class AddPagamentoComponent extends ZexalComponent {

    _style = "frontEnd/content/contabilita/add-pagamento-component.css";

    _elencoCorsi = [];

    _elencoIscritti = [];

    _data = {
        idCorso: 0,
        data: new Date().toISOString().slice(0, 10),
        idIscritto: null,
        importo: 0,
        descrizione: ""
    };

    connectedCallback() {
        const self = this;
        this.render();
        $.ajax({
            type: "POST",
            url: "/userFunction",
            data: { id: 15 },
            dataType: "json",
            success: function() {
                $.ajax({
                    type: "POST",
                    url: "/getCorsi",
                    data: {},
                    dataType: "json",
                    success: function(s) {
                        self._elencoCorsi = s;
                        if (s.length > 0) {
                            self._data.idCorso = self._elencoCorsi[0].id;
                            self._data.costo = self._elencoCorsi[0].costo;
                            self.loadCorso(self._elencoCorsi[0].id);
                        } else {
                            self.render();
                        }
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

    loadCorso(id) {
        this._data.idIscritto = null;
        var self = this;
        $.ajax({
            type: "POST",
            url: "/getCorso",
            data: {
                id: id
            },
            dataType: "json",
            success: function(s) {
                self._elencoIscritti = s.iscritti;
                if (self._elencoIscritti.length > 0) {
                    self._data.idIscritto = self._elencoIscritti[0].id;
                }
                self.render();
            },
            error: function(e) {
                console.log(e);
            }
        });

    }

    _addEvent() {
        const self = this;
        $(this.querySelectorAll('*[name]')).on("change keyup keydown", function() {
            self._data[$(this).attr("name")] = this.value;
            if ($(this).attr("name") == "idCorso") {
                self.loadCorso(this.value);
            }
        });
        this.querySelector('form').addEventListener('submit', function(e) {
            self.sendData(e);
        });
    }

    sendData(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/addPagamentoCorso",
            data: this._data,
            dataType: "json",
            success: function(s) {
                document.querySelector("app-content").connectedCallback();
            },
            error: function(e) {
                console.log(e);
                document.querySelector("app-content").connectedCallback();
            }
        });
    }

    _render() {
        var self = this;
        var r = `<center>
            <form>
                <div class="form-group row">`;
        if (this._elencoCorsi.length == 0) {
            r += `<label class="col-sm-12 col-form-label">Non ci sono corsi disponibili</label>
            </div>`;
        } else {
            r += `
            <label class="col-sm-3 col-form-label">Corso</label>
            <div class="col-sm-9">
                <select class="form-control col-sm-12" name="idCorso">`;
            this._elencoCorsi.forEach(el => {
                r += `<option value="` + el.id + `" ` + (self._data.idCorso == el.id ? "selected" : "") + `>` + el.nome + `</option>`;
            });
            r += `</select>
            </div>
        </div>`;

            if (this._elencoIscritti.length == 0) {
                r += `<label class="col-sm-12 col-form-label">Nessuno può pagare questo corso, verifica ci siano iscritti</label>`;
            } else {
                r += `<div class="form-group row">
            <label class="col-sm-2 col-form-label">Iscritto</label>
            <div class="col-sm-10">
                <select class="form-control col-sm-12" name="idIscritto">`;
                this._elencoIscritti.forEach(el => {
                    r += `<option value="` + el.id + `" ` + (self._data.idIscritto == el.id ? "selected" : "") + `>` + el.cognome + ' ' + el.nome + `</option>`;
                });
                r += `</select>
            </div>
        </div>
        
        <div class="form-group row">

            <label class="col-sm-2 col-form-label">Data pagamento</label>
            <div class="col-sm-4">
                <input type="date" class="form-control" name="data" required value="` + this._data.data + `">
            </div>

            <label class="col-sm-4 col-form-label">
                Importo pagato
            </label>
            <div class="col-sm-4">
                <input type="number" class="form-control" name="importo" required value="` + this._data.importo + `" step="0.01">
            </div>

        </div>

        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Descrizione</label>
            <textarea name="descrizione">` + this._data.descrizione + `</textarea>
        </div>

        <button type="submit" class="btn btn-primary mb-2">Aggiungi iscrizione</button>`;
            }
        }

        r += `</form>
        </center>`;
        return r;
    }
}
customElements.define("add-pagamento", AddPagamentoComponent);