import { ZexalTextQuestionComponent } from './zexal-textquestion-component.js'

export class ZexalPhoneQuestionComponent extends ZexalTextQuestionComponent {

    reg = "[0-9]{8,10}"
    max = 10;

    _content() {
        return `<div class="question-text">
            <input class="anser" name="` + this.name + `" type="tel" placeholder="La tua risposta">
            <div class="underline"></div>
        </div>`;
    }
    _addEvent() {
        super._addEvent();
        $('input', this).on("keydown keyup key", function(e) {
            if (!(e.key == "Backspace" || e.key == "Delete" || (e.key >= "0" && e.key <= "9"))) {
                e.preventDefault();
            }
        });
    }
}
customElements.define("zexal-phone", ZexalPhoneQuestionComponent);