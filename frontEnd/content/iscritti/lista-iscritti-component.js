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

    render() {
        super.render();
        var self = this;
        $(this.querySelector('select')).on('change', function() {
            self.setAnno($(this).val());
        });
        $('tr').on("click", function() {
            $('app-content').html("");
            $('app-content').append(new DatiIscrittoComponent(1));
        });
    }

    _render() {
        var r = `
        <select>
            <option value="2020" selected>2020</option>
        </select>

        <table class="table table-striped">
            <tr>
                <th>Cognome</th>
                <th>Nome</th>
            </tr>`;

        this._data.forEach(el => {
            r += `<tr>
                    <td>` + el.cognome + `</td>
                    <td>` + el.nome + `</td>
                </tr>`;
        });
        r += `
        </table>`;

        return r;
    }
}

export class ListaSociComponent extends ListaIscrittiComponent {

    connectedCallback() {
        const self = this;
        this.render();
        $.ajax({
            type: "POST",
            url: "/userFunction",
            data: { id: 8 },
            dataType: "json",
            success: function() {
                self.setAnno("2020");
            },
            error: function(e) {
                console.log(e);
            }
        });
    }

    setAnno(a) {
        var self = this;
        $.ajax({
            type: "POST",
            url: "/getSoci",
            data: {
                anno: a
            },
            dataType: "json",
            success: function(s) {
                self._data = s;
                self.render();
            },
            error: function(e) {
                console.log(e);
            }
        });
    }

}
customElements.define("lista-soci", ListaSociComponent);