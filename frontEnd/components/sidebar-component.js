class SidebarComponent extends ZexalComponent {

    _style = "frontEnd/components/sidebar-component.css";

    _render() {
        return `
			<div class="sidebar-header">
				<h3>Bootstrap Sidebar</h3>
			</div>
			<ul class="sidebar-nav">
				<sidebar-list open="1"></sidebar-list>
				<sidebar-list open="1"></sidebar-list>
			</ul>
		`;
    }
}
customElements.define("app-sidebar", SidebarComponent);