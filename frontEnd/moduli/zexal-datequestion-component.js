import { ZexalTextQuestionComponent } from './zexal-textquestion-component.js'

export class ZexalDateQuestionComponent extends ZexalTextQuestionComponent {

    maxdate
    mindate

    _content() {
        var html = `<div class="question-date">`;
        if (this._value == undefined)
            html += `<input class="anser" name="` + this.name + `" type="date" placeholder="La tua risposta">`;
        else
            html += `<input class="anser" name="` + this.name + `" type="date" placeholder="La tua risposta" value="` + this._value + `">`;
        html += `<div class="underline"></div>
        </div>`;
        return html;
    }

    _extraEvent(self) {}

    _isValid() {
        if (this.required) {
            if ($('input', this).val() != "") {
                var d = new Date($("input", this).val());
                if (this.maxdate != undefined) {
                    var m = new Date(this.maxdate);
                    if (m < d) {
                        if (!$('.section-question', this).hasClass('error')) {
                            $('.section-question', this).addClass('error');
                        }
                        return false;
                    }
                }
                if (this.mindate != undefined) {
                    var m = new Date(this.mindate);
                    if (m > d) {
                        if (!$('.section-question', this).hasClass('error')) {
                            $('.section-question', this).addClass('error');
                        }
                        return false;
                    }
                }
                if ($('.section-question', this).hasClass('error')) {
                    $('.section-question', this).removeClass('error');
                }
                return true;
            } else {
                return false;
            }
        }
        return true;
    }
}
customElements.define("zexal-date", ZexalDateQuestionComponent);