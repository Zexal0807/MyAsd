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


export class ZexalFormComponent extends ZexalComponent {

    method = "POST"
    action = "";
    enctype = "multipart/form-data";
    content = [];

    _style = 'frontEnd/moduli/zexalForm.css';

    constructor() {
        super();
        var js = this.getAttribute("data-json");
        this.removeAttribute("data-json");
        var self = this;

        $.ajax({
            url: js,
            method: "GET",
            dataType: "json",
            success: function(c) {
                Object.assign(self, c);
                self.render();
            },
            error: function(e) {
                debugger;
                Object.assign(self, e);
                self.render();
            }
        });
    }

    _changeSection(id) {
        var d = $('.carousel-item.active > *', this);
        console.log(d);

        var vi = true;
        $.each(d, function(k, v) {
            if (!v._isValid()) {
                if (vi) {
                    $([document.documentElement, document.body]).animate({
                        scrollTop: $('.section-question', v).offset().top - 15
                    }, 2000);
                }
                vi = false;
            }
        });
        $('.carousel', this).carousel(id);
    }

    _render() {
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
            var elem;
            el.forEach(function(sel, si) {
                switch (sel.type) {
                    case "button":
                        $('.carousel-item[data-value="' + i + '"]', form).append(new ZexalButtonComponent(sel));
                        break;
                    case "check":
                        $('.carousel-item[data-value="' + i + '"]', form).append(new ZexalCheckQuestionComponent(sel));
                        break;
                    case "date":
                        $('.carousel-item[data-value="' + i + '"]', form).append(new ZexalDateQuestionComponent(sel));
                        break;
                    case "email":
                        $('.carousel-item[data-value="' + i + '"]', form).append(new ZexalEmailQuestionComponent(sel));
                        break;
                    case "file":
                        $('.carousel-item[data-value="' + i + '"]', form).append(new ZexalFileQuestionComponent(sel));
                        break;
                    case "number":
                        $('.carousel-item[data-value="' + i + '"]', form).append(new ZexalNumberQuestionComponent(sel));
                        break;
                    case "phone":
                        $('.carousel-item[data-value="' + i + '"]', form).append(new ZexalPhoneQuestionComponent(sel));
                        break;
                    case "radio":
                        $('.carousel-item[data-value="' + i + '"]', form).append(new ZexalRadioQuestionComponent(sel));
                        break;
                    case "text":
                        $('.carousel-item[data-value="' + i + '"]', form).append(new ZexalTextQuestionComponent(sel));
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