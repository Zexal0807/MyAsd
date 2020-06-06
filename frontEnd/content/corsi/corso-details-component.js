export class CorsoDetailComponent extends ZexalComponent {

    _id = null
    _data = null;

    _editMode = false;

    _i = 0;

    constructor(id) {
        super();
        this._id = id;
    }

    connectedCallback() {
        var self = this;
        if (this._id == null) {
            this._editMode = true;
            this._data = {
                nome: "",
                inizio: "",
                fine: "",
                costo: "",
                modificabile: false,
                orari: []
            }
            this.render();
        } else {
            $.ajax({
                type: "POST",
                url: "/getCorso",
                data: { id: this._id },
                dataType: "json",
                success: function(d) {
                    self._data = d;
                    self.render();
                },
                error: function(e) {
                    console.log(e);
                }
            });
        }
    }

    _addRemoveDayEvent() {
        var self = this;

        $('i[data-row]', this).off("click");
        $('i[data-row]', this).on("click", function() {
            var ind = Number(this.getAttribute('data-row'));
            self._data.orari.splice(ind, 1);
            $(this.parentElement.parentElement).remove();
            $(self.querySelectorAll('i[data-row]')).each(function(k, v) {
                if (Number(v.getAttribute('data-row')) > ind) {
                    v.setAttribute('data-row', Number(v.getAttribute('data-row')) - 1);
                }
            });
        });

        //update self._data on key
        $('*[name]', this).off("change keyup keydown");
        $('*[name]', this).on("change keyup keydown", function(e) {
            var p = this.name.split("[");
            for (let i = 0; i < p.length; i++) {
                p[i] = p[i].split("]")[0];
            }

            var tmp = this.value;
            for (let i = 0; i < p.length; i++) {
                var a = [];
                a[p[p.length - 1 - i]] = tmp;
                tmp = a;
            }

            function mergeV(v1, v2, p) {
                if (p.length == 1) {
                    return {...v1, ...v2 };
                } else {
                    let h = [];
                    h[p[0]] = mergeV(v1[p[0]], v2[p[0]], p.slice(1))
                    return {...v1, ...h };
                }
            }
            self._data = mergeV(self._data, tmp, p);
        });
    }


    _addEvent() {
        var self = this;
        $('.back', this).on("click", function() {
            document.querySelector('app-content').connectedCallback();
        });
        $('form', this).on('submit', function(e) {
            self.sendData(e);
        });

        if (this._data.modificabile || this._id == null) {
            if (this._data.modificabile) {
                $('.edit', this).on("click", function() {
                    self._editMode = true;
                    self.render();
                });
                $('.delete', this).on("click", function() {
                    if (confirm("Sicuro?")) {
                        $.ajax({
                            type: "POST",
                            url: "/deleteCorso",
                            data: {
                                id: self._data.id
                            },
                            dataType: "json",
                            success: function(s) {
                                document.querySelector("app-content").connectedCallback();
                            },
                            error: function(e) {
                                document.querySelector("app-content").connectedCallback();
                            }
                        });
                    }
                });
            }
            $('.add-day', this).on("click", function() {
                self._data.orari[self._i] = { giorno: "Mon", inizio: "", fine: "" };
                self.querySelector('.days').innerHTML += self._renderDay(self._data.orari[self._i], self._i);
                self._addRemoveDayEvent();
                self._i++;
            });
            this._addRemoveDayEvent();
        }
    }

    sendData(e) {
        e.preventDefault();

        if (this._editMode) {
            if (this._id == null) {
                $.ajax({
                    type: "POST",
                    url: "/addCorso",
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
            } else {
                $.ajax({
                    type: "POST",
                    url: "/editCorso",
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
        }


    }

    _renderDay(o, i) {
        var html = `
            <div class="form-group row" >
                <div class="col-sm-1 col-form-label"></div>`;
        if (this._editMode) {
            html += `<select class="form-control col-sm-2" name="orari[` + i + `][giorno]">`;
            html += `<option value="Mon" ` + (o.giorno == 'Mon' ? "selected" : "") + `>Lun</option>`
            html += `<option value = "Tue" ` + (o.giorno == 'Tue' ? "selected" : "") + ` > Mar</option> `
            html += `<option value = "Wed" ` + (o.giorno == 'Wed' ? "selected" : "") + ` > Mer</option> `
            html += `<option value = "Thu" ` + (o.giorno == 'Thu' ? "selected" : "") + ` > Gio</option> `
            html += `<option value = "Fri" ` + (o.giorno == 'Fri' ? "selected" : "") + ` > Ven</option> `
            html += `<option value = "Sat" ` + (o.giorno == 'Sat' ? "selected" : "") + ` > Sab</option> `
            html += `<option value = "Sun" ` + (o.giorno == 'Sun' ? "selected" : "") + ` > Dom</option> `
            html += `</select>`;
        } else {
            html += `<div class="col-form-label">` + o.giorno + `</div>`;
        }
        html += `
                <label class="col-sm-2 col-form-label">Ora inizio</label>
            <div class="col-sm-2">`;
        if (this._editMode) {
            html += `<input type="time" class="form-control" name="orari[` + i + `][inizio]" required value="` + o.inizio + `">`;
        } else {
            html += `<div class="col-form-label">` + o.inizio + `</div>`;
        }
        html += `</div>
                <label class="col-sm-2 col-form-label">Ora fine</label>
                <div class="col-sm-2">`;
        if (this._editMode) {
            html += `<input type="time" class="form-control" name="orari[` + i + `][fine]" required value="` + o.fine + `">`;
        } else {
            html += `<div class="col-form-label">` + o.fine + `</div>`;
        }
        html += `</div>
                    <div class="col-sm-1 col-form-label">`;
        if (this._editMode) {
            html += `<i data-row="` + i + `" class="fa fa-times"></i>`;
        }
        html += `</div>
            </div>`;
        return html;
    }

    _render() {
        var self = this;
        var html = `<i class="fas fa-arrow-circle-left back"></i>`;

        if (this._data.modificabile) {
            html += `<i class="fas fa-trash-alt delete"></i>`;
            if (!this._editMode) {
                html += `<i class="fas fa-edit edit"></i>`;
            }
        }
        html += this._data.nome + `
        <hr>
        <form>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Nome corso</label>
                <div class="col-sm-10">`;
        if (this._editMode) {
            html += `<input type="text" class="form-control" name="nome" placeholder="Nome corso" required value="` + this._data.nome + `">`;
        } else {
            html += `<div class="col-form-label">` + this._data.nome + `</div>`;
        }
        html += `</div>
            </div >
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Data inizio</label>
                <div class="col-sm-4">`;
        if (this._editMode) {
            html += `<input type="date" class="form-control" name="inizio" required value="` + this._data.inizio + `">`;
        } else {
            html += `<div class="col-form-label">` + this._data.inizio + `</div>`;
        }
        html += `
                </div>
                <label class="col-sm-2 col-form-label">Data fine</label>
                <div class="col-sm-4">`;
        if (this._editMode) {
            html += `<input type="date" class="form-control" name="fine" required value="` + this._data.fine + `">`;
        } else {
            html += `<div class="col-form-label">` + this._data.fine + `</div>`;
        }
        html += `</div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Costo totale</label>
                <div class="col-sm-4">`;
        if (this._editMode) {
            html += `<input type="number" class="form-control" name="costo" required value="` + this._data.costo + `">`;
        } else {
            html += `<div class="col-form-label">` + this._data.costo + `</div>`;
        }
        html += `</div>
            </div>

            <hr>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Orari:</label>
                <div class="col-sm-10"></div>
            </div>
            <div class="days">`;
        this._i = 0;
        this._data.orari.forEach(o => {
            html += self._renderDay(o, self._i);
            self._i++;
        });
        html += `</div>`;
        if (this._editMode) {
            html += `
            <center>
                <i class="add-day fa fa-plus"></i>
                <br>
                <hr>
            <button type="submit" class="btn btn-primary mb-2">`;
            if (this._id == null) {
                html += "Aggiungi corso";
            } else {
                html += "Salva";
            }
            html += `</button>
            </center>`;
        }
        html += `
        </form>`;

        return html;
    }
}
customElements.define("corso-details", CorsoDetailComponent);