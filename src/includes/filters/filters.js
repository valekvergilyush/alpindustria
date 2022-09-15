const HTML_CLASSLIST = document.documentElement.classList;
const ClassName = {
	OPENED: '_filters-opened',
};

class Filters {
	constructor() {
		this.init();
	}

	init() {
		this.filtersContainer = document.querySelector('.page__filters');

		if (!this.filtersContainer) {
			return;
		}

		this.toggler = this.filtersContainer.querySelector('[data-filters-toggle]');

		this.onTogglerClick = this.onTogglerClick.bind(this);
		this.onWindowKeydown = this.onWindowKeydown.bind(this);

		this.toggler.addEventListener('click', this.onTogglerClick);
	}
	toggle() {
		HTML_CLASSLIST.contains(ClassName.OPENED) ? this.close() : this.open();
	}
	open() {
		HTML_CLASSLIST.add(ClassName.OPENED);

		window.addEventListener('keydown', this.onWindowKeydown);
	}
	close() {
		HTML_CLASSLIST.remove(ClassName.OPENED);

		window.removeEventListener('keydown', this.onWindowKeydown);
	}
	onTogglerClick(evt) {
		evt.preventDefault();

		this.toggle();
	}

	onWindowKeydown(evt) {
		if (evt.key === 'Escape') {
			this.close();
		}
	}
}

export default new Filters();
