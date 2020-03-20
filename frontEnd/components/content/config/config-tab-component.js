import { PrimaryTabComponent } from './../primary-tab-component.js';

export class ConfigTabComponent extends PrimaryTabComponent {
    _url = 'config';
}
customElements.define("config-tab", ConfigTabComponent);