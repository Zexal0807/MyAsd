class AppComponent extends ZexalComponent{
	
	_loggedIn = null;

	connectedCallback(){
		this.render();
		const self = this;
		$.ajax({
			type: "POST",
			url: "pippo",
			data: {},
			dataType: "json",
			success: function (s){
				self._loggedIn = s;
				self.render();
			},
			error: function (e){
				self._loggedIn = false;
				self.render();
			}
		});
	}
	
	_render(){
		var screen = null;
		if(this._loggedIn == null){
			return "<div>LOADER</div>";
		}else if(this._loggedIn){
			screen = new AppHomeComponent();
			screen._data = this._loggedIn;
		}else{
			screen = new AppLoginComponent();
		}
		return screen;
	}
}
customElements.define("app-root", AppComponent);