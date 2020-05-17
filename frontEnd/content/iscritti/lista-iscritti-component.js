import { DatiIscrittoComponent } from './dati-iscritto-component.js';

class RigaIscritto extends ZexalComponent {

    _data = null;

    _style = "frontEnd/content/iscritti/lista-iscritti-component.css"

    constructor(data) {
        super();
        this._data = data;
    }

    _render() {
        return `
        <div class="col-12 p-0 ml-0 mr-0">
            <div class="col-3 col-md-2 p-0">
                <center>
                    <img src="load-image/` + this._data.foto + `" >
                </center>
            </div>
            <div class="col-5 col-md-4">` + this._data.cognome + " " + this._data.nome + `</div>
            <div class="col-4 col-md-3">` + this._data.data_nascita + `</div>
            <div class="col-md-3 d-none d-md-block">` + this._data.codice_fiscale + `</div>
        </div>`;
    }

    _addEvent() {
        var self = this;
        $(this).on("click", function() {
            $('app-content').html("");
            $('app-content').append(new DatiIscrittoComponent(self._data.id));
        });
    }

}
customElements.define("riga-iscritto", RigaIscritto);

class ListaIscrittiComponent extends ZexalComponent {

    _data = [];

    _filterYear = true;
    _year = (new Date()).getFullYear();

    _functionId = null;
    _loadUrl = null;

    connectedCallback() {
        var self = this;
        this.render();
        $.ajax({
            type: "POST",
            url: "/userFunction",
            data: {
                id: self._functionId
            },
            dataType: "json",
            success: function() {
                self.loadData();
            },
            error: function(e) {
                console.log(e);
            }
        });
    }

    setAnno(a) {
        this._year = a;
        this.loadData();
    }

    loadData() {
        var self = this;
        var d = {};
        if (this._filterYear) {
            d.anno = this._year;
        }
        $.ajax({
            type: "POST",
            url: self._loadUrl,
            dataType: "json",
            data: d,
            success: function(s) {
                self._data = s;
                self.render();
            },
            error: function(e) {
                console.log(e);
            }
        });
    }

    render() {
        super.render();
        var self = this;
        $(this._data).each(function(k, v) {
            $(".data", self).append(new RigaIscritto(v));
        });
    }

    _render() {
        var r = ``;
        if (this._filterYear) {
            r += `<div class="col-12 filter">
                <div class="">
            Anno sportivo:
            <select class="form-control">`;
            var y = (new Date()).getFullYear();
            for (let i = 2015; i <= y; i++) {
                r += `<option value="` + i + `"`;
                if (i == this._year) {
                    r += ` selected`;
                }
                r += `>` + i + `</option>`
            }
            r += `</select>
            </div>
        </div>`;
        }
        r += `<div class="data"></div>`;

        return r;
    }

    _addEvent() {
        var self = this;
        if (this._filterYear) {
            $(this.querySelector('select')).on('change', function() {
                self._year = $(this).val();
                self.setAnno($(this).val());
            });
        }
    }

}

export class ListaSociComponent extends ListaIscrittiComponent {

    _functionId = 8;
    _loadUrl = "/getSoci";

}
customElements.define("lista-soci", ListaSociComponent);


export class ListaTesseratiComponent extends ListaIscrittiComponent {

    _functionId = 8;
    _loadUrl = "/getTesserati";

}
customElements.define("lista-tesserati", ListaTesseratiComponent);


export class ListaAssociatiComponent extends ListaIscrittiComponent {

    _filterYear = false;

    _functionId = 8;
    _loadUrl = "/getAssociati";

}
customElements.define("lista-associati", ListaAssociatiComponent);