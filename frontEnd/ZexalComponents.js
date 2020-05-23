class ZexalComponent extends HTMLElement {

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    _style = null;

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    _addEvent() {}

    render() {
        this.innerHTML = '';

        var content = this._render();
        if (content instanceof HTMLElement) {
            this.append(content);
        } else {
            this.innerHTML = content;
        }
        this._addEvent();
        if (this._style != null) {
            if (document.querySelectorAll("link[href='" + this._style + "']").length == 0) {
                const style = document.createElement('link');
                style.setAttribute('rel', 'stylesheet');
                style.setAttribute('href', this._style);
                document.head.append(style);
            }
        }
    }
}