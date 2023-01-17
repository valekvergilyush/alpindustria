import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const HTML_CLASSLIST = document.documentElement.classList;

const ClassName = {
	INITIALIZED: '_initialized',
	OPENED: '_search-opened',
	EMPTY: '_empty',
	NO_RESULTS: '_no-results',
	RESET: '_reset',
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
		this.toggleButtonText = this.toggleButton.querySelector('[data-search-toggle-text]');
		this.toggleButtonValue = this.toggleButton.querySelector('[data-search-toggle-value]');
		this.tabs = this.container.querySelectorAll('[data-search-menu-tab]');
		this.activeTab = this.container.querySelector('[data-search-menu-tab]:checked');
		this.activeTabValue = this.container.querySelector('[data-search-menu-tab]:checked').value;
		this.searchInput = this.container.querySelector('[data-search-menu-input]');
		this.searchSubmit = this.container.querySelector('[data-search-menu-submit]');

		this.containerClassMod = `_${this.activeTabValue}`;

		this._onWindowKeydown = this._onWindowKeydown.bind(this);
		this._onToggleButtonClick = this._onToggleButtonClick.bind(this);
		this._onTabChange = this._onTabChange.bind(this);
		this._onSearchInputInput = this._onSearchInputInput.bind(this);

		window.addEventListener('keydown', this._onWindowKeydown);
		this.toggleButton.addEventListener('click', this._onToggleButtonClick);
		this.tabs.forEach(tab => tab.addEventListener('change', this._onTabChange));
		this.searchInput.addEventListener('input', this._onSearchInputInput);

		this.isOpened = false;
		this.container.classList.add(ClassName.INITIALIZED);
		this.container.classList.add(this.containerClassMod);
		this.searchInput.placeholder = this.activeTab.getAttribute('data-search-input-placeholder');
		this.toggleButtonValue.textContent = this.searchInput.value;

		if (!this.searchInput.value) {
			this.toggleButtonText.classList.add(ClassName.EMPTY);
		}
	}
	open() {
		HTML_CLASSLIST.add(ClassName.OPENED);
		this.searchInput.focus();
		this.isOpened = !this.isOpened;
		disableBodyScroll(this.container);
	}
	close() {
		HTML_CLASSLIST.remove(ClassName.OPENED);
		this.searchInput.blur();
		this.isOpened = !this.isOpened;
		enableBodyScroll(this.container);
	}
	toggle() {
		this.isOpened ? this.close() : this.open();
	}
	_onToggleButtonClick(evt) {
		evt.preventDefault();

		if (this.toggleButton.classList.contains(ClassName.RESET) && !this.isOpened) {
			this.toggleButtonValue.textContent = '';
			this.searchInput.value = '';
			this.toggleButton.classList.remove(ClassName.RESET);
			this.toggleButtonText.classList.add(ClassName.EMPTY);
			this.container.classList.add(ClassName.NO_RESULTS);

			this._setSubmitButtonText();
		} else {
			this.toggle();
		}
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

		this._setSubmitButtonText();
	}
	_onSearchInputInput(evt) {
		this.toggleButtonValue.textContent = evt.target.value;

		if (evt.target.value) {
			this.toggleButton.classList.add(ClassName.RESET);
			this.toggleButtonText.classList.remove(ClassName.EMPTY);
			this.container.classList.remove(ClassName.NO_RESULTS);
		} else {
			this.toggleButton.classList.remove(ClassName.RESET);
			this.toggleButtonText.classList.add(ClassName.EMPTY);
			this.container.classList.add(ClassName.NO_RESULTS);
		}

		this._setSubmitButtonText();
	}
	_setSubmitButtonText() {
		let submitButtonText;

		switch (this.activeTabValue) {
			case 'shop':
			case 'rent':
				submitButtonText = this.searchInput.value ? '120 товаров' : '0 товаров';
				break;
			case 'community':
				submitButtonText = this.searchInput.value ? '8 занятий' : '0 занятий';
				break;
			case 'news':
				submitButtonText = this.searchInput.value ? '43 статьи' : '0 статей';
				break;
			case 'brands':
				submitButtonText = this.searchInput.value ? '8 брендов' : '0 брендов';
				break;

			default:
				submitButtonText = 'Найти';
				break;
		}
		this.searchSubmit.querySelector('.button__text').textContent = submitButtonText;
	}
}

export default new Search();
