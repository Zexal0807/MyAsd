export class ZexalHiddenComponent extends ZexalComponent {

    constructor(arr = []) {
        super();
        Object.assign(this, arr);
    }

    _isValid() { return true; }

    _render() {
        return '<input type="hidden" name="' + this.name + '" value="' + this.value + '"/>';
    }
}
customElements.define("zexal-hidden", ZexalHiddenComponent);