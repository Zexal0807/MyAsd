export class ZexalQuestionComponent extends ZexalComponent {

    name = "";
    domanda = "";
    descrizione = "";
    required = true;

    constructor(arr = []) {
        super();
        Object.assign(this, arr);
    }

    _content() {
        return '';
    }

    _render() {
        var html = `<div class="section-question">
            <div class="question">` + this.domanda + `
                <span>` + (this.required ? '*' : '') + `</span>
                <div class="desc">` + this.descrizione + `</div>
            </div>`;
        html += this._content();
        html += (this.required ? `<div class="error">
                Questa è una domanda obbligatoria </div>` : '') +
            `</div>`;
        return html;
    }

    _isValid() {
        return true;
    }
}