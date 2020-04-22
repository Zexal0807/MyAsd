export class CorsiElencoComponent extends ZexalComponent {

    _style = "frontEnd/content/corsi/corsi-elenco-component.css";

    _data = [];

    connectedCallback() {
        this.render();
        const self = this;
        $.ajax({
            type: "POST",
            url: "/getCorsi",
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
        var r = document.createElement('div');
        r.innerHTML = `
            <div class="corso-header row ml-0 mr-0">
                <div class="col-5">Nome Corso</div>
                <div class="col-3">Inizio</div>
                <div class="col-3">Fine</div>
                <div class="col-1">
                    <add-corso></add-corso>
                </div>
            </div>
        `;
        this._data.forEach(d => {
            r.append(new CorsoComponent(d));
        });
        return r;
    }
}
customElements.define("corsi-elenco", CorsiElencoComponent);

class CorsoComponent extends ZexalComponent {

    _data = null;

    constructor(data) {
        super();
        this._data = data;
    }

    connectedCallback() {
        this.render();
        var self = this;
        this.querySelector('.row').addEventListener("click", function() {
            $(this.parentElement.querySelector('.details')).slideToggle();
            $(this.querySelector('i')).toggleClass("fa-arrow-circle-down");
            $(this.querySelector('i')).toggleClass("fa-arrow-circle-up");
        });
        if (this._data.modificabile) {
            this.querySelector('.details .fa-edit').addEventListener("click", function() {
                $(self.querySelector('.modal')).toggleClass("show");
            });
            this.querySelector('.details .fa-trash-alt').addEventListener("click", function() {
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
    }

    _render() {
        var ret = document.createElement('div');
        var r = document.createElement('div');
        r.className = "row ml-0 mr-0";
        r.innerHTML = `
            <div class="col-5">` + this._data.nome + `</div>
            <div class="col-3">` + this._data.inizio + `</div>
            <div class="col-3">` + this._data.fine + `</div>
            <div class="col-1">
                <i class="fas fa-arrow-circle-down"></i>
            </div>`;

        ret.append(r);

        var r = document.createElement('div');
        r.className = "details";
        r.innerHTML = `Costo : ` + this._data.costo + `<br>`;

        r.innerHTML += `<br>Orari:`;
        this._data.orari.forEach(o => {
            r.innerHTML += "<br>" + o.giorno + ` dalle ` + o.inizio + " alle " + o.fine;
        });
        if (this._data.modificabile) {
            r.innerHTML += `<i class="fas fa-edit"></i><i class="fas fa-trash-alt"></i>`;
            r.append(new EditCorsoComponent(this._data));
        }
        ret.append(r);
        return ret;
    }
}
customElements.define("corso-row", CorsoComponent);

class CorsoModalComponent extends ZexalComponent {

    _actionText = "";

    _i = 0;

    addEvent() {
        const self = this;
        this.querySelector('.add-day').addEventListener("click", function() {
            self._data.orari[self._i] = { giorno: "Mon", inizio: "", fine: "" };
            self.querySelector('.days').innerHTML += self._renderDay(self._data.orari[self._i], self._i);
            self._addRemoveDayEvent();
            self._i++;
        });
        this._addRemoveDayEvent();
        this.querySelector('button.close').addEventListener('click', function() {
            $(self.querySelector('.modal')).toggleClass("show");
        });
        this.querySelector('form').addEventListener('submit', function(e) {
            self.sendData(e);
        });
    }

    _addRemoveDayEvent() {
        var self = this;
        $(this.querySelectorAll('i[data-row]')).unbind("click");
        $(this.querySelectorAll('i[data-row]')).on("click", function() {
            var ind = Number(this.getAttribute('data-row'));
            self._data.orari.splice(ind, 1);
            $(this.parentElement.parentElement).remove();
            $(self.querySelectorAll('i[data-row]')).each(function(k, v) {
                if (Number(v.getAttribute('data-row')) > ind) {
                    v.setAttribute('data-row', Number(v.getAttribute('data-row')) - 1);
                }
            });

        });
        $(this.querySelectorAll('*[name]')).unbind("change keyup keydown");
        $(this.querySelectorAll('*[name]')).on("change keyup keydown", function(e) {
            if (this.type == 'time' && this.value.length == 5)
                this.value = this.value + ":00";
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

    _renderDay(o, i) {
        var r = `
        <div class="form-group row">
            <div class="col-sm-1 col-form-label"></div>
            <select class="form-control col-sm-2" name="orari[` + i + `][giorno]">`;
        r += `<option value="Mon" ` + (o.giorno == 'Mon' ? "selected" : "") + `>Lun</option>`
        r += `<option value="Tue" ` + (o.giorno == 'Tue' ? "selected" : "") + `>Mar</option>`
        r += `<option value="Wed" ` + (o.giorno == 'Wed' ? "selected" : "") + `>Mer</option>`
        r += `<option value="Thu" ` + (o.giorno == 'Thu' ? "selected" : "") + `>Gio</option>`
        r += `<option value="Fri" ` + (o.giorno == 'Fri' ? "selected" : "") + `>Ven</option>`
        r += `<option value="Sat" ` + (o.giorno == 'Sat' ? "selected" : "") + `>Sab</option>`
        r += `<option value="Sun" ` + (o.giorno == 'Sun' ? "selected" : "") + `>Dom</option>`
        r += `</select>
            <label class="col-sm-2 col-form-label">Ora inizio</label>
            <div class="col-sm-2">
                <input type="time" class="form-control" name="orari[` + i + `][inizio]" required value="` + o.inizio + `">
            </div>
            <label class="col-sm-2 col-form-label">Ora fine</label>
            <div class="col-sm-2">
                <input type="time" class="form-control" name="orari[` + i + `][fine]" required value="` + o.fine + `">
            </div>
            <div class="col-sm-1 col-form-label">
                <i data-row="` + i + `" class="fa fa-times"></i>
            </div>
        </div>`;
        return r;
    }

    _render() {
        var self = this;
        var r = `
<div class="modal bd-example-modal-lg" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">` + this._actionText + `</h5>
        <button type="button" class="close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Nome corso</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" name="nome" placeholder="Nome corso" required value="` + this._data.nome + `">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Data inizio</label>
                <div class="col-sm-4">
                    <input type="date" class="form-control" name="inizio" required value="` + this._data.inizio + `">
                </div>
                <label class="col-sm-2 col-form-label">Data fine</label>
                <div class="col-sm-4">
                    <input type="date" class="form-control" name="fine" required value="` + this._data.fine + `">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">Costo totale</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control" name="costo" required value="` + this._data.costo + `" placeholder="210">
                </div>
            </div>
            <hr>
            <div class="days">`;
        this._data.orari.forEach(o => {
            r += self._renderDay(o, self._i);
            self._i++;
        });
        r += `</div>
            <center>
            <i class="add-day fa fa-plus"></i>
            <br>
            <hr>
            <button type="submit" class="btn btn-primary mb-2">
            ` + this._actionText + `
            </button>
            </center>
        </form>
      </div>
    </div>
  </div>
</div> `;
        return r;
    }

}

class AddCorsoComponent extends CorsoModalComponent {

    _data = {
        id: "",
        nome: "",
        inizio: "",
        fine: "",
        costo: "",
        orari: [
            { giorno: "", inizio: "", fine: "" }
        ]
    };

    _actionText = "Aggiungi Corso"

    connectedCallback() {
        const self = this;
        $.ajax({
            type: "POST",
            url: "/userFunction",
            data: {
                id: 12
            },
            dataType: "json",
            success: function(s) {
                self.render();
                self.addEvent();
            },
            error: function(e) {}
        });
    }

    addEvent() {
        super.addEvent();
        const self = this;

        this.querySelector('button.open').addEventListener('click', function() {
            $(self.querySelector('.modal')).toggleClass("show");
        });
    }

    sendData(e) {
        e.preventDefault();

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
    }

    _render() {
        if (!this._data)
            return '';
        return `<button class="open">+</button>` + super._render();
    }

}
customElements.define("add-corso", AddCorsoComponent);

class EditCorsoComponent extends CorsoModalComponent {

    constructor(data) {
        super();
        this._data = data;
    }

    _actionText = "Modifica Corso"

    connectedCallback() {
        const self = this;
        $.ajax({
            type: "POST",
            url: "/userFunction",
            data: {
                id: 13
            },
            dataType: "json",
            success: function(s) {
                self.render();
                self.addEvent();
            },
            error: function(e) {}
        });
    }

    sendData(e) {
        e.preventDefault();

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

    _render() {
        if (!this._data)
            return '';
        return super._render();
    }

}
customElements.define("edit-corso", EditCorsoComponent);