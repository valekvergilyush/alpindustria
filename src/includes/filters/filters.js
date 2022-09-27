import Popups from '../../assets/js/modules/Popups';
import Accordion from '../../assets/js/modules/Accordion';

const HTML_CLASSLIST = document.documentElement.classList;
const TABLET_BREAKPOINT = 992;

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
		this.mqTablet = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT}px)`);
		this.accordions = [];

		this.isOpened = HTML_CLASSLIST.contains(ClassName.OPENED);

		this.onTogglerClick = this.onTogglerClick.bind(this);
		this.onWindowKeydown = this.onWindowKeydown.bind(this);

		this.toggler.addEventListener('click', this.onTogglerClick);

		const onWindowWidthChange = evt => {
			if (evt.matches) {
				this.close();
			} else {
				this.close();
			}
		};

		this.mqTablet.addEventListener('change', onWindowWidthChange);
		onWindowWidthChange(this.mqTablet);

		Popups.onCloseStart.add(() => {
			if (Popups.activePopupName === 'filters-form') {
				this.close();
			}
		});
	}
	toggle() {
		this.isOpened ? this.close() : this.open();
	}
	open() {
		HTML_CLASSLIST.add(ClassName.OPENED);
		this.isOpened = true;

		if (window.innerWidth <= TABLET_BREAKPOINT) {
			Popups.open('filters-form');
		}

		clearTimeout(this.TO);

		if (!this.accordions.length) {
			this.TO = setTimeout(() => {
				this.filtersForm
					.querySelectorAll('[data-accordion-toggle]')
					.forEach(toggle => this.accordions.push(new Accordion(toggle)));
			}, 300);
		}

		window.addEventListener('keydown', this.onWindowKeydown);
	}
	close() {
		HTML_CLASSLIST.remove(ClassName.OPENED);
		this.isOpened = false;

		Popups.close();

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
