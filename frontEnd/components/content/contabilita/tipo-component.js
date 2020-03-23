class TipoComponent extends ZexalComponent {

    _style = "frontEnd/components/content/contabilita/tipo-component.css";

    _data = [];

    addEvent() {
        const self = this;
        this.querySelector('.add-line').addEventListener("click", function() {
            self.querySelector('form > div').innerHTML += self._add();
        });
        this.querySelector('form').addEventListener('submit', function(e) {
            self.sendData(e);
        });
    }

    render() {
        super.render();
        this.addEvent();
    }

    _add() {
        return `
        <div class="form-group row">
            <label class="col-sm-3 col-form-label">Descizione tipo</label>
            <input class="col-sm-9 form-control" type="text" name="descrizione[]" required>
        </div>
    `;
    }

    _render() {
        var r = `<center>
            <form><div>`;
        var self = this;
        this._data.forEach(el => {
            r += `
            <div class="form-group row">
                <label class="col-sm-3 col-form-label">Descizione tipo</label>
                <div class="col-sm-9">
                    <div class="form-control">` + el.descrizione + `</div>
                </div>
            </div>`
        });
        r += `</div>
            <i class="add-line fa fa-plus"></i>
            <br>
            <hr>
            <button type="submit" class="btn btn-primary mb-2">Salva</button>
            </form>
        </center>`;
        return r;
    }
}

export class TipoEntrateComponent extends TipoComponent {

    connectedCallback() {
        this.render();
        const self = this;
        $.ajax({
            type: "POST",
            url: "/getTipoEntrate",
            data: {},
            dataType: "json",
            success: function(s) {
                self._data = s;
                self.render();
            },
            error: function(e) {
                debugger;
                location.reload();
            }
        });
    }

    sendData(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/addTipoEntrate",
            data: $(e.target).serializeArray(),
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

export class TipoUsciteComponent extends TipoComponent {

    connectedCallback() {
        this.render();
        const self = this;
        $.ajax({
            type: "POST",
            url: "/getTipoUscite",
            data: {},
            dataType: "json",
            success: function(s) {
                self._data = s;
                self.render();
            },
            error: function(e) {
                debugger;
                location.reload();
            }
        });
    }

    sendData(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/addTipoUscite",
            data: $(e.target).serializeArray(),
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

customElements.define("tipo-entrate", TipoEntrateComponent);
customElements.define("tipo-uscite", TipoUsciteComponent);