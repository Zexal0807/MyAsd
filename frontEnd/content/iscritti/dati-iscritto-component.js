export class DatiIscrittoComponent extends ZexalComponent {

    _style = "frontEnd/content/iscritti/dati-iscritto-component.css"

    _id = null
    _data = null;
    _doc = null;

    constructor(id) {
        super();
        this._id = id;
    }

    connectedCallback() {
        var self = this;
        $.ajax({
            type: "POST",
            url: "/getDatiIscritto",
            data: { id: this._id },
            dataType: "json",
            success: function(d) {
                self._data = d.data;
                self._doc = d.doc;
                self.render();
            },
            error: function(e) {
                console.log(e);
            }
        });
    }

    back() {
        document.querySelector('app-content').render();
    }

    _addEvent() {
        var self = this;
        if (isMobile) {
            $(document).on("backbutton", function() {
                self.back();
            });
        }
        $('.back', self).on("click", function() {
            self.back();
        });
        $(".data", this).append(new DocTableComponent(this._doc));
    }

    _render() {
        var html = `
        <i class="fas fa-arrow-circle-left back"></i>

        <div class="m-1 data">
            <div class="row ml-0 mr-0 anagrafica">
                <div class="col-5 col-md-4">
                    <center>
                        <img src="load-file/` + this._data.foto + `" class="img-thumbnail col-12 col-md-9 m-0 p-0">
                    </center>
                </div>
                <div class="col-7 col-md-8">
                    <span>` + this._data.cognome + ` ` + this._data.nome + `</span><br>
                    <span>` + this._data.data_nascita;
        if (isMobile) {
            html += `</span><br><span>`;
        } else {
            html += ` - `;
        }
        html += this._data.codice_fiscale + `</span>
                </div>
            </div>
        </div>`;
        return html;
    }
}
customElements.define("dati-iscritto", DatiIscrittoComponent);

class CustomTableComponent extends ZexalComponent {

    _name = ""

    _data = [];

    constructor(data) {
        super();
        this._data = data;
    }

    _render() {
        var html = `<div class="he">
            <span>` + this._name + `</span>
        </div>
        <div class="table">
        </div>`;
        return html;
    }

    renderRow(data, hid) {}

    _addEvent() {
        for (var i = 0; i < this._data.length; i++) {
            $('.table', this).append(
                this.renderRow(this._data[i], i < 2)
            );
        }
        if (this._data.length > 2) {
            $('.table', this).append(
                `<div class="open">
                    <i class="fas fa-angle-double-down"></i>
                </div>`
            );
            $('.open').on("click", function() {
                if ($("i", this).hasClass("fa-angle-double-down")) {
                    $("i", this).removeClass("fa-angle-double-down");
                    $("i", this).addClass("fa-angle-double-up");
                    $(".hiddable", $(this).parents(".table")).slideDown({
                        start: function() {
                            $(this).css("display", "flex")
                        }
                    });
                } else {
                    $("i", this).removeClass("fa-angle-double-up");
                    $("i", this).addClass("fa-angle-double-down");
                    $(".hiddable", $(this).parents(".table")).slideUp();
                }
            });
        }
    }
}
customElements.define("custom-table", CustomTableComponent);

class DocTableComponent extends CustomTableComponent {
    _name = "Documenti";

    renderRow(data, hid) {
        return `<div class="row` + (hid ? '' : ' hiddable') + `">
            <div class="col-4 col-md-3">` + data.data_creazione + `</div>
            <div class="col-8 col-md-9">
                ` + data.nome + `
                <i class="fas fa-download" file-id="` + data.id + `"></i>
            </div>
        </div>`;
    }

    _addEvent() {
        var self = this;
        super._addEvent();

        $("i[file-id]", this).on("click", function(e) {
            var url = "/load-file/" + $(e.target).attr("file-id");
            if (isMobile) {
                alert("Download disponibili solo da PC");
            } else {
                var req = new XMLHttpRequest();
                req.open("GET", url, true);
                req.responseType = "blob";
                req.onload = function(event) {
                    var blob = req.response;
                    var fileName = req.getResponseHeader("content-disposition") //if you have the fileName header available
                    fileName = fileName.substring(fileName.indexOf("=") + 1);
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = fileName;
                    link.click();
                };

                req.send();
            }
        });
    }

}
customElements.define("doc-table", DocTableComponent);