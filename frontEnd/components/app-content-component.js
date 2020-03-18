class AppContentComponent extends ZexalComponent {
    static get observedAttributes() {
        return ['url'];
    }

    _render() {
        return "<div>CONTENT</div>";
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