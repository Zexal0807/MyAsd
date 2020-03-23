export class AddIscrizioneComponent extends ZexalComponent {

    _style = "frontEnd/components/content/corsi/add-iscrizione-component.css";

    _elencoCorsi = [];

    _elencoIscritti = [];

    _data = {
        idCorso: 0,
        data: new Date().toISOString().slice(0, 10)
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
                        self.loadCorso(self._elencoCorsi[0].id);
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
        var self = this;
        $.ajax({
            type: "POST",
            url: "/getCorsoDetails",
            data: {
                id: id
            },
            dataType: "json",
            success: function(s) {
                self._elencoIscritti = s;
                self.render();
            },
            error: function(e) {
                console.log(e);
            }
        });

    }

    render() {
        super.render();
        this.addEvent();
    }

    addEvent() {
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
                    <label class="col-sm-2 col-form-label">Data iscrizione</label>
                    <div class="col-sm-4">
                        <input type="date" class="form-control" name="data" required value="` + this._data.data + `">
                    </div>
                    <label class="col-sm-2 col-form-label">Corso</label>
                    <div class="col-sm-4">
                        <select class="form-control col-sm-12" name="idCorso">`;
        this._elencoCorsi.forEach(el => {
            r += `<option value="` + el.id + `" ` + (self._data.idCorso == el.id ? "selected" : "") + `>` + el.nome + `</option>`;
        });
        r += `</select>
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Iscritto</label>
                    <div class="col-sm-10">
                        <select class="form-control col-sm-12" name="idIscritto">`;
        this._elencoIscritti.forEach(el => {
            r += `<option value="` + el.id + `" ` + (self._data.idIscritto == el.id ? "selected" : "") + `>` + el.cognome + ' ' + el.nome + `</option>`;
        });
        r += `</select>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary mb-2">Aggiungi iscrizione</button>
            </form>
        </center>`;
        return r;
    }
}
customElements.define("add-iscrizione", AddIscrizioneComponent);