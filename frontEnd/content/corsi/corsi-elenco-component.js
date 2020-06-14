import { CorsoDetailComponent } from './corso-details-component.js';

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

    _addEvent() {
        $('button', this).on("click", function() {
            $('app-content > div').html("");
            $('app-content > div').append(new CorsoDetailComponent(null));
        });
    }

    _render() {
        var ret = document.createElement('div');
        ret.innerHTML = `
            <center><button><i class="fas fa-plus"></i></button></center>
            <hr>
        `;
        var r = document.createElement('div');
        r.className = "row ml-0 mr-0 mt-3";
        this._data.forEach(d => {
            r.append(new CorsoComponent(d));
        });
        ret.append(r);
        return ret;
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

        $(this).on("click", function() {
            $('app-content > div').html("");
            $('app-content > div').append(new CorsoDetailComponent(self._data.id));
        });
    }

    _render() {
        this.className = "col-12 col-md-4"
        var html = `<div class="card">
            <div class="card-body">
                <span class="titolo">` + this._data.nome + `</span><br>
                <span class="periodo">Dal <b>` + this._data.data_inizio + `</b>`;
        if (isMobile) {
            html += '<br>';
        }

        html += `al <b>` + this._data.data_fine + `</b></span>
            </div>
        </div>`;
        return html
    }
}
customElements.define("corso-component", CorsoComponent);