class TipoComponent extends ZexalComponent {

    _style = "frontEnd/components/content/contabilita/tipo-component.css";

    _data = [];

    _i = 0;

    addEvent() {
        const self = this;
        this.querySelector('.add-line').addEventListener("click", function() {
            self._data[self._i] = { id: "", descrizione: "" };
            self.querySelector('form > div').innerHTML += self._renderTipo(self._data[self._i], self._i);
            self._i++;
            self._addRemoveEvent();
        });
        this._addRemoveEvent();
        this.querySelector('form').addEventListener('submit', function(e) {
            self.sendData(e);
        });
    }

    _addRemoveEvent() {
        var self = this;
        $(this.querySelectorAll('i[data-row]')).unbind("click");
        $(this.querySelectorAll('i[data-row]')).on("click", function() {
            delete self._data[Number(this.getAttribute('data-row'))];
            $(this.parentElement.parentElement).remove();
        });
        $(this.querySelectorAll('*[name]')).on("change keyup keydown", function() {
            var k = this.name.split("][");
            self._data[k[0].substr(1)]['descrizione'] = this.value;
        });
    }


    render() {
        super.render();
        this.addEvent();
    }

    _renderTipo(el, i) {
        return `
        <div class="form-group row">
            <label class="col-sm-3 col-form-label">Descizione tipo</label>
            <input type="hidden" class="form-control" name="[` + i + `][id]" required value="` + el.id + `">
            <div class="col-sm-8">
                <input type="text" class="form-control" name="[` + i + `][descrizione]" placeholder="Tipo entrata" required value="` + el.descrizione + `">
            </div>
            <div class="col-sm-1">
                <i data-row="` + i + `" class="fa fa-times"></i>
            </div>
        </div>
    `;
    }

    _render() {
        var r = `<center>
            <form><div>`;
        var self = this;
        this._data.forEach(el => {
            r += self._renderTipo(el, self._i);
            self._i++;
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
            url: "/setTipoEntrate",
            data: { data: this._data },
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
            url: "/setTipoUscite",
            data: { data: this._data },
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