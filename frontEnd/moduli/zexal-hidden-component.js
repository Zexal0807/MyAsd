export class ZexalHiddenComponent extends ZexalComponent {

    constructor(arr = [], value = undefined) {
        super();
        Object.assign(this, arr);
        if (value != undefined)
            this.value = value;
    }

    _isValid() { return true; }

    _render() {
        return '<input type="hidden" name="' + this.name + '" value="' + this.value + '"/>';
    }
}
customElements.define("zexal-hidden", ZexalHiddenComponent);