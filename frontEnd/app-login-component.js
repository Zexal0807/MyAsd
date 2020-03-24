import { AppAlertComponent } from './app-alert-component.js';

export class AppLoginComponent extends ZexalComponent {

    login(e) {
        e.preventDefault();

        $.ajax({
            url: "/login",
            type: "POST",
            data: {
                username: this.querySelectorAll('form input')[0].value,
                password: this.querySelectorAll('form input')[1].value
            },
            success: function() {
                location.reload();
            },
            error: function(e) {
                document.querySelector("app-alert").add("danger", e.responseText, false);
            }
        });
    }

    connectedCallback() {
        super.connectedCallback();
        this.querySelector('form').addEventListener('submit', this.login.bind(this));
    }

    _render() {
        return `
        <app-alert></app-alert>
		<center>
			<div class="card col-8 col-md-6">
				<form class="card-body">
					<div class="form-group">
						<label>Username</label>
						<input type="text" class="form-control" placeholder="Inserisci l'username" required>
					</div>
					<div class="form-group">
						<label>Password</label>
						<input type="password" class="form-control" placeholder="Inserisci la password" required>
					</div>
					<button type="submit" class="btn btn-primary">Login</button>
				</form>
			</div>
		</center>`;
    }
}
customElements.define("app-login", AppLoginComponent);