export class ConfermaTesseramentoComponent extends ZexalComponent {

    _style = "frontEnd/content/corsi/add-iscrizione-component.css";

    _elencoIscritti = [];

    _data = {
        code: null
    };

    connectedCallback() {
        var self = this;
        this.render();
        $.ajax({
            type: "POST",
            url: "/userFunction",
            data: { id: 15 },
            dataType: "json",
            success: function() {
                $.ajax({
                    type: "POST",
                    url: "/getTesseramentoComfermabile",
                    data: {},
                    dataType: "json",
                    success: function(s) {
                        self._elencoIscritti = s;
                        if (s.length > 0) {
                            self._data.code = s[0].code;
                        }
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

    _addEvent() {
        var self = this;
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
            url: "/confermaTesseramento",
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
        if (this._elencoIscritti.length == 0) {
            r += `<label class="col-sm-12 col-form-label">Non ci tesseramenti che possono essere confermati</label>
                </div>`;
        } else {
            r += `<label class="col-sm-3 col-form-label">Iscritto</label>
                        <div class="col-sm-7">
                            <select class="form-control col-sm-12" name="code">`;
            this._elencoIscritti.forEach(el => {
                r += `<option value="` + el.code + `" ` + (self._data.code == el.code ? "selected" : "") + `>` + el.code + ` - ` + el.cognome + ' ' + el.nome + `</option>`;
            });
            r += `</select>
                        </div>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary mb-2">Conferma Tesseramento</button>`;
        }
        r += `</form>
        </center>`;
        return r;
    }
}
customElements.define("conferma-tesseramento", ConfermaTesseramentoComponent);