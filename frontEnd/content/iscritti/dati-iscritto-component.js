class DatiIscrittoComponent extends ZexalComponent {

    _id = null
    _data = null;

    constructor(id) {
        super();
        this._id = id;
    }

    connectedCallback() {
        const self = this;
        this.render();
        $.ajax({
            type: "POST",
            url: "/getDatiIscritto",
            data: { id: this._id },
            dataType: "json",
            success: function(d) {
                self._data = d;
            },
            error: function(e) {
                console.log(e);
            }
        });
    }

    connectedCallback() {
        this.render();
        var self = this;
    }

    _render() {
        return '<div><b>' + this._data.nome + ' ' + this._data.cognome + '</b></div>';
    }
}
customElements.define("dati-iscritto", DatiIscrittoComponent);