export class DatiIscrittoComponent extends ZexalComponent {

    _id = null
    _data = null;

    constructor(id) {
        super();
        this._id = id;
    }

    connectedCallback() {
        const self = this;
        $.ajax({
            type: "POST",
            url: "/getDatiIscritto",
            data: { id: this._id },
            dataType: "json",
            success: function(d) {
                self._data = d;
                self.render();
                $('button', self).on('click', function() {
                    document.querySelector('app-content').render();
                });
            },
            error: function(e) {
                console.log(e);
            }
        });
    }

    _render() {
        return '<button>INDIETRO</button><div><b>' + this._data.nome + ' ' + this._data.cognome + '</b></div>';
    }
}
customElements.define("dati-iscritto", DatiIscrittoComponent);