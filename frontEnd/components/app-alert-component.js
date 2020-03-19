class AppAlertComponent extends ZexalComponent {

    _style = "frontEnd/components/app-alert-component.css";

    add(type = "success", content, autodismiss = true) {

        var alert = document.createElement("div");
        alert.className = "alert alert-" + type + " alert-dismissible";

        if (autodismiss) {
            setTimeout(function() {
                $(alert).slideUp(800, function() {
                    $(alert).remove();
                });
            }, 5000);
        }

        alert.append(content);

        var b = document.createElement("button");
        b.type = "button";
        b.className = "close";
        b.innerHTML = '<span aria-hidden="true">&times;</span>';
        b.addEventListener("click", function() {
            $(alert).slideUp(800, function() {
                $(alert).remove();
            });
        });
        alert.append(b)

        this.append(alert);
    }

    _render() {
        return '';
    }

}
customElements.define("app-alert", AppAlertComponent);