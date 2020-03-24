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

    render() {
        this.innerHTML = '';

        var content = this._render();
        if (content instanceof HTMLElement) {
            this.append(content);
        } else {
            this.innerHTML = content;
        }
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