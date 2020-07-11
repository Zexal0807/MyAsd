export class ZexalButtonComponent extends ZexalComponent {

    section = "submit";

    constructor(arr = []) {
        super();
        Object.assign(this, arr);
    }

    _addEvent() {
        $('.section-button', this).on('click', function() {
            var n = $(this).attr("data-section");
            if (n != "submit") {
                if (n == parseInt(n)) {
                    n = parseInt(n);
                } else {
                    n = new Function(n)();
                    n = n();
                }
            }
            $(this).parents('zexal-form')[0]._changeSection(n);
        });
    }

    _isValid() { return true; }

    _render() {
        return `<button class="section-button" data-section="` + this.section + `" type="button">AVANTI</button>`;
    }

}
customElements.define("zexal-button", ZexalButtonComponent);