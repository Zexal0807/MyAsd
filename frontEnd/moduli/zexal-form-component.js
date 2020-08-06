import { ZexalButtonComponent } from './zexal-button-component.js'
import { ZexalCheckQuestionComponent } from './zexal-checkquestion-component.js'
import { ZexalDateQuestionComponent } from './zexal-datequestion-component.js'
import { ZexalEmailQuestionComponent } from './zexal-emailquestion-component.js'
import { ZexalFileQuestionComponent } from './zexal-filequestion-component.js'
import { ZexalNumberQuestionComponent } from './zexal-numberquestion-component.js'
import { ZexalPhoneQuestionComponent } from './zexal-phonequestion-component.js'
import { ZexalRadioQuestionComponent } from './zexal-radioquestion-component.js'
import { ZexalTextQuestionComponent } from './zexal-textquestion-component.js'
import { ZexalTitleComponent } from './zexal-title-component.js'
import { ZexalHiddenComponent } from './zexal-hidden-component.js'

export class ZexalFormComponent extends ZexalComponent {

    method = "POST"
    action = "";
    enctype = "multipart/form-data";
    content = [];

    _data = [];

    _style = 'frontEnd/moduli/zexalForm.css';

    constructor() {
        super();
        var js = this.getAttribute("data-json");
        this.removeAttribute("data-json");

        var cf = this.getAttribute("data-c");
        this.removeAttribute("data-c");

        var self = this;

        $.ajax({
            url: js,
            method: "GET",
            dataType: "json",
            success: function(c) {
                Object.assign(self, c);
                if (cf != null) {
                    $.ajax({
                        url: "/getAnagrafica",
                        method: "POST",
                        data: {
                            c: cf,
                            asd: self.content[0][1].value //Posizione by default da cercare
                        },
                        success: function(c) {
                            self._data = c;
                            self.render();
                        },
                        error: function(e) {}
                    });
                } else {
                    self.render();
                }
            },
            error: function(e) {
                console.log(e);
            }
        });
    }

    _changeSection(id) {
        var vi = true;
        $.each($('.carousel-item.active > *', this), function(k, v) {
            if (!v._isValid()) {
                if (vi) {
                    $([document.documentElement, document.body]).animate({
                        scrollTop: $('.section-question', v).offset().top - 15
                    }, 2000);
                }
                vi = false;
            }
        });
        if (vi) {
            if (id != "submit") {
                $('.carousel', this).carousel(id);
            } else {
                $('form', this).submit();
            }
        }
    }

    _render() {
        var self = this;
        var form = document.createElement("form");
        form.method = this.method;
        form.action = this.action;
        form.enctype = this.enctype;
        var html = `<div class="col-11 col-md-7"></div>
            <div id="carouselExampleSlidesOnly" class="carousel slide col-11 col-md-7 p-4" data-interval="false">
                <div class="carousel-inner">`;

        this.content.forEach(function(el, i) {
            html += `<div class="carousel-item` + (i == 0 ? ' active"' : '"') + ` data-value="` + i + `"></div>`;
        });
        html += `</div>
            </div>`;

        form.innerHTML = html;
        this.content.forEach(function(el, i) {
            var v = undefined;
            el.forEach(function(sel, si) {
                v = (self._data[sel.name] == undefined ? undefined : self._data[sel.name]);
                switch (sel.type) {
                    case "hidden":
                        $('.carousel-item[data-value="' + i + '"]', form).append(new ZexalHiddenComponent(sel, v));
                        break;
                    case "button":
                        $('.carousel-item[data-value="' + i + '"]', form).append(new ZexalButtonComponent(sel));
                        break;
                    case "check":
                        $('.carousel-item[data-value="' + i + '"]', form).append(new ZexalCheckQuestionComponent(sel, v));
                        break;
                    case "date":
                        $('.carousel-item[data-value="' + i + '"]', form).append(new ZexalDateQuestionComponent(sel, v));
                        break;
                    case "email":
                        $('.carousel-item[data-value="' + i + '"]', form).append(new ZexalEmailQuestionComponent(sel, v));
                        break;
                    case "file":
                        $('.carousel-item[data-value="' + i + '"]', form).append(new ZexalFileQuestionComponent(sel));
                        break;
                    case "number":
                        $('.carousel-item[data-value="' + i + '"]', form).append(new ZexalNumberQuestionComponent(sel, v));
                        break;
                    case "phone":
                        $('.carousel-item[data-value="' + i + '"]', form).append(new ZexalPhoneQuestionComponent(sel, v));
                        break;
                    case "radio":
                        $('.carousel-item[data-value="' + i + '"]', form).append(new ZexalRadioQuestionComponent(sel, v));
                        break;
                    case "text":
                        $('.carousel-item[data-value="' + i + '"]', form).append(new ZexalTextQuestionComponent(sel, v));
                        break;
                    case "title":
                        $('.carousel-item[data-value="' + i + '"]', form).append(new ZexalTitleComponent(sel));
                        break;
                }
            });
        });

        return form;
    }

}
customElements.define("zexal-form", ZexalFormComponent);