import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const HTML_CLASSLIST = document.documentElement.classList;

const ClassName = {
	INITIALIZED: '_initialized',
	OPENED: '_search-opened',
};

class Search {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('[data-search-menu]');

		if (!this.container) {
			return;
		}

		this.toggleButton = document.querySelector('[data-search-toggle]');
		this.tabs = this.container.querySelectorAll('[data-search-menu-tab]');
		this.activeTab = this.container.querySelector('[data-search-menu-tab]:checked');
		this.activeTabValue = this.container.querySelector('[data-search-menu-tab]:checked').value;
		this.searchInput = this.container.querySelector('[data-search-menu-input]');

		this.containerClassMod = `_${this.activeTabValue}`;

		this._onWindowKeydown = this._onWindowKeydown.bind(this);
		this._onToggleButtonClick = this._onToggleButtonClick.bind(this);
		this._onTabChange = this._onTabChange.bind(this);

		window.addEventListener('keydown', this._onWindowKeydown);
		this.toggleButton.addEventListener('click', this._onToggleButtonClick);
		this.tabs.forEach(tab => tab.addEventListener('change', this._onTabChange));

		this.isOpened = false;
		this.container.classList.add(ClassName.INITIALIZED);
		this.container.classList.add(this.containerClassMod);
		this.searchInput.placeholder = this.activeTab.getAttribute('data-search-input-placeholder');
	}
	open() {
		HTML_CLASSLIST.add(ClassName.OPENED);
		this.isOpened = !this.isOpened;
		disableBodyScroll(this.container);
	}
	close() {
		HTML_CLASSLIST.remove(ClassName.OPENED);
		this.isOpened = !this.isOpened;
		enableBodyScroll(this.container);
	}
	toggle() {
		this.isOpened ? this.close() : this.open();
	}
	_onToggleButtonClick(evt) {
		evt.preventDefault();

		this.toggle();
	}
	_onWindowKeydown(evt) {
		if (evt.key === 'Escape') {
			this.close();
		}
	}
	_onTabChange(evt) {
		evt.preventDefault();

		const tab = evt.target;
		this.activeTabValue = tab.value;

		this.container.classList.remove(this.containerClassMod);
		this.containerClassMod = `_${this.activeTabValue}`;
		this.container.classList.add(this.containerClassMod);

		this.searchInput.placeholder = tab.getAttribute('data-search-input-placeholder');
	}
}

export default new Search();
