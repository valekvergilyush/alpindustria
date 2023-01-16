import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Popups from '../../assets/js/modules/Popups';
import Accordion from '../../assets/js/modules/Accordion';
import Catalog from '../catalog/catalog';

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
		this.filtersWrapper = document.querySelector('.catalog__filters-wrapper');
		this.filtersForm = document.querySelector('.filters-form');

		if (!this.filtersContainer || !this.filtersForm) {
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
		disableBodyScroll(this.filtersForm);

		if (window.innerWidth > TABLET_BREAKPOINT) {
			gsap.to(this.filtersWrapper, {
				width: document.body.clientWidth / 2,
				opacity: 1,
				duration: 0.3,
				ease: 'linear',
			});
		}

		if (window.innerWidth <= TABLET_BREAKPOINT) {
			Popups.open('filters-form');
		}

		if (window.innerWidth >= TABLET_BREAKPOINT) {
			this.layout = Catalog.getLayout();
			Catalog.setLayout(2);
			document.querySelector('.filters__layout').classList.add('no-pe');
		}

		if (!this.accordions.length) {
			this.filtersForm
				.querySelectorAll('[data-accordion-toggle]')
				.forEach(toggle => this.accordions.push(new Accordion(toggle)));
		}

		window.addEventListener('keydown', this.onWindowKeydown);
	}
	close() {
		if (HTML_CLASSLIST.contains(ClassName.OPENED)) {
			Popups.close();
		}
		HTML_CLASSLIST.remove(ClassName.OPENED);
		this.isOpened = false;
		enableBodyScroll(this.filtersForm);

		gsap.to(this.filtersWrapper, {
			width: 0,
			opacity: 0,
			duration: 0.3,
			ease: 'linear',
		});

		if (this.layout) {
			Catalog.setLayout(this.layout);
			document.querySelector('.filters__layout').classList.remove('no-pe');
		}

		window.removeEventListener('keydown', this.onWindowKeydown);
	}
	onTogglerClick(evt) {
		evt.preventDefault();

		gsap.to(window, {
			scrollTo: { y: '#main', offsetY: this.filtersContainer.offsetHeight - 2 },
		});
		this.toggle();
	}

	onWindowKeydown(evt) {
		if (evt.key === 'Escape') {
			this.close();
		}
	}
}

export default new Filters();
