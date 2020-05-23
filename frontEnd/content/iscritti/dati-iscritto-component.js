export class DatiIscrittoComponent extends ZexalComponent {

    _style = "frontEnd/content/iscritti/dati-iscritto-component.css"

    _id = null
    _data = null;

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
                self._data = d;
                self.render();
            },
            error: function(e) {
                console.log(e);
            }
        });
    }

    _addEvent() {
        var self = this;
        $('.back', self).on("click", function() {
            document.querySelector('app-content').render();
        });

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

    _render() {
        var html = `
        <i class="fas fa-arrow-circle-left back"></i>

        <div class="m-1">
            <div class="row ml-0 mr-0 anagrafica">
                <div class="col-5 col-md-4">
                    <center>
                        <img src="load-image/` + this._data.foto + `" class="img-thumbnail w-75">
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
        html += this._data.codice_fiscale + `</span >
                </div >
            </div >
            <div class="esami">
                <div class="he">
                    <span>Esami</span>
                </div>
                <div class="table">
                    <div class="row">

                        <div>
                            <div>01 Gen<br>2020</div>
                            </div>
                            <div>
                                Conversione secondo nuove categorie<br>
                                <img src="/immagini/gradi/-62.png">
                            </div>
                        
                        </div>

                        <div>
                            <div>01 Gen<br>2020</div>
                            </div>
                            <div>
                                Conversione secondo nuove categorie<br>
                                <img src="/immagini/gradi/-62.png">
                            </div>
                        
                        </div>
                                
                        
                        <div class="open">
                            <i class="fas fa-angle-double-down"></i>
                        </div>
                    </div>
                </div>
            </div>

            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

    </div>`;
        return html;
    }
}
customElements.define("dati-iscritto", DatiIscrittoComponent);