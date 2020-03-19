class AppContentComponent extends ZexalComponent {

    _style = "frontEnd/components/app-content-component.css";

    constructor() {
        super();
        this.setAttribute("url", "/home");
    }

    static get observedAttributes() {
        return ['url'];
    }

    _render() {

        var div = document.createElement("div");
        div.append(this.getAttribute('url'));

        return div;
        var screen = null;
        switch (this.getAttribute("url")) {
            case "home":
                screen = new Home();
                break;
            default:
                screen = new Altro();
                break;
        }
        return screen;
    }
}
customElements.define("app-content", AppContentComponent);