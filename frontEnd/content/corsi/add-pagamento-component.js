export class AddPagamentoComponent extends ZexalComponent {

    _style = "frontEnd/content/corsi/add-pagamento-component.css";

    _elencoPagamenti = [];

    _elencoCorsi = [];

    _elencoIscritti = [];

    _data = {
        idCorso: null,
        data: new Date().toISOString().slice(0, 10),
        idIscritto: null,
        importo: 0,
        idTipoPagamento: null,
        descrizione: ""
    };

    connectedCallback() {
        const self = this;
        this.render();
        $.ajax({
            type: "POST",
            url: "/userFunction",
            data: { id: 9 },
            dataType: "json",
            success: function() {
                $.ajax({
                    type: "POST",
                    url: "/getTipoPagamento",
                    data: {},
                    dataType: "json",
                    success: function(s) {
                        self._elencoPagamenti = s;
                        self._data.idTipoPagamento = self._elencoPagamenti[0].id;
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
            } else if ($(this).attr("name") == "idIscritto") {
                self.render();
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
                document.querySelector('alert-component').add("success", "Pagamento registrato");
            },
            error: function(e) {
                console.log(e);
                document.querySelector("app-content").connectedCallback();
                document.querySelector('alert-component').add("danger", "Pagamento fallito");
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
            <label class="col-sm-3 col-form-label">Iscritto</label>
            <div class="col-sm-9">
                <select class="form-control col-sm-12" name="idIscritto">`;
                this._elencoIscritti.forEach(el => {
                    r += `<option value="` + el.id + `" ` + (self._data.idIscritto == el.id ? "selected" : "") + `>` + el.cognome + ' ' + el.nome + `</option>`;
                });
                r += `</select>
            </div>
        </div>
        
        <div class="form-group row">
            <label class="col-sm-3 col-form-label">Data pagamento</label>
            <div class="col-sm-3">
                <input type="date" class="form-control" name="data" required value="` + this._data.data + `">
                </div>
            <label class="col-sm-3 col-form-label">Tipo Pagamento</label>
            <div class="col-sm-3">
                <select class="form-control col-sm-12" name="idTipoPagamento">`;
                this._elencoPagamenti.forEach(el => {
                    r += `<option value="` + el.id + `" ` + (self._data.idTipoPagamento == el.id ? "selected" : "") + `>` + el.descrizione + `</option>`;
                });
                r += `</select>
            </div>
        </div>

        <div class="form-group row">
            <label class="col-sm-3 col-form-label">
                Importo pagato
            </label>
            <div class="col-sm-3">
                <input type="number" class="form-control" name="importo" required value="` + this._data.importo + `" step="0.01">
            </div>
            <label class="col-sm-3 col-form-label">Già Pagato</label>
            
            <div class="col-sm-3">
                <div class="progress w-100">
                    <div class="progress-bar progress-bar-striped bg-success" role="progressbar" 
                    style="width:` + this._elencoIscritti.find(function(e) {
                    return self._data.idIscritto == e.id;
                }).perc + `%">` + this._elencoIscritti.find(function(e) {
                    return self._data.idIscritto == e.id;
                }).pagato + "€/" + this._elencoIscritti.find(function(e) {
                    return self._data.idIscritto == e.id;
                }).costo + `€</div>
                </div>
            </div>
        </div>

        <div class="form-group row">
            <label class="col-sm-3 col-form-label">Descrizione</label>
            <div class="col-sm-9">
                <textarea name="descrizione" class="form-control col-sm-12">` + this._data.descrizione + `</textarea>
            </div>
        </div>

        <button type="submit" class="btn btn-primary mb-2">Aggiungi pagamento</button>`;
            }
        }
        r += `</form>
        </center>`;
        return r;
    }
}
customElements.define("add-pagamento", AddPagamentoComponent);