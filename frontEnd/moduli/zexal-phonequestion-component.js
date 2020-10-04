import { ZexalTextQuestionComponent } from './zexal-textquestion-component.js'

export class ZexalPhoneQuestionComponent extends ZexalTextQuestionComponent {

    reg = "[0-9]{8,10}"
    max = 10;

    _content() {
        var html = `<div class="question-text">`;
        if (this._value == undefined)
            html += `<input class="anser" name="` + this.name + `" type="tel" placeholder="La tua risposta">`;
        else
            html += `<input class="anser" name="` + this.name + `" type="tel" placeholder="La tua risposta" value="` + this._value + `">`;
        html += `<div class="underline"></div>
        </div>`;
        return html;
    }

    _extraEvent(self) {
        $('input', this).on("keydown keyup key", function(e) {
            if (!(e.key == "Backspace" || e.key == "Delete" || (e.key >= "0" && e.key <= "9"))) {
                e.preventDefault();
            }
        });
    }
}
customElements.define("zexal-phone", ZexalPhoneQuestionComponent);