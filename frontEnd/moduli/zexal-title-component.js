export class ZexalTitleComponent extends ZexalComponent {

    titolo = ""
    descrizione = ""
    sub = false;

    constructor(arr = []) {
        super();
        Object.assign(this, arr);
    }

    _isValid() { return true }

    _render() {
        return `<div class="section-` + (this.sub ? 'sub' : '') + `title">` + this.titolo + `
            <div class="desc">` + this.descrizione + `</div>
        </div>`;
    }

}
customElements.define("zexal-title", ZexalTitleComponent);