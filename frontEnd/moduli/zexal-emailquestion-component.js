import { ZexalTextQuestionComponent } from './zexal-textquestion-component.js'

export class ZexalEmailQuestionComponent extends ZexalTextQuestionComponent {

    _content() {
        var html = `<div class="question-text">`;
        if (this._value == undefined)
            html += `<input class="anser" name="` + this.name + `" type="email" placeholder="La tua risposta">`;
        else
            html += `<input class="anser" name="` + this.name + `" type="email" placeholder="La tua risposta" value="` + this._value + `">`;
        html += `<div class="underline"></div>
        </div>`;
        return html;
    }
}
customElements.define("zexal-email", ZexalEmailQuestionComponent);