import { DatiIscrittoComponent } from './dati-iscritto-component.js';

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