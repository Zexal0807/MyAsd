import { ZexalTextQuestionComponent } from './zexal-textquestion-component.js'

export class ZexalEmailQuestionComponent extends ZexalTextQuestionComponent {

    _content() {
        return `<div class="question-text">
            <input class="anser" name="` + this.name + `" type="email" placeholder="La tua risposta">
            <div class="underline"></div>
        </div>`;
    }
}
customElements.define("zexal-email", ZexalEmailQuestionComponent);