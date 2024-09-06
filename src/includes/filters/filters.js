import Accordion from '../../assets/js/modules/Accordion';
import Catalog from '../catalog/catalog';

const HTML_CLASSLIST = document.documentElement.classList;
const TABLET_BREAKPOINT = 992;

const ClassName = {
	OPENED: '_filters-opened',
	HIDDEN_NUM: '_hidden-num',
};

class Filters {
	constructor() {
		this.init();
	}

	init() {
		this.filtersContainer = document.querySelector('.page__filters');
		this.filtersHeaderMobile = document.querySelector('.filters__container');
		this.filtersWrapper = document.querySelector('.catalog__filters-wrapper');
		this.filtersForm = document.querySelector('.filters-form');

		if (!this.filtersContainer || !this.filtersForm) {
			return;
		}

		this.toggler = this.filtersContainer.querySelector('[data-filters-toggle]');
		this.mqTablet = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT}px)`);
		this.accordions = [];
		this.filtersContainer.animating = false;

		this.isOpened = HTML_CLASSLIST.contains(ClassName.OPENED);

		this.onTogglerClick = this.onTogglerClick.bind(this);
		this.onWindowKeydown = this.onWindowKeydown.bind(this);

		this.toggler.addEventListener('click', this.onTogglerClick);

		const onWindowWidthChange = evt => {
			if (evt.matches) {
				this.isOpened && this.close();
			} else {
				this.isOpened && this.close();
			}
		};

		this.mqTablet.addEventListener('change', onWindowWidthChange);
		onWindowWidthChange(this.mqTablet);
	}
	toggle() {
		this.filtersContainer.animating = true;
		this.isOpened ? this.close() : this.open();
		this.animTO = setTimeout(() => {
			this.filtersContainer.animating = false;
		}, 300);
	}
	open() {
		HTML_CLASSLIST.add(ClassName.OPENED);
		this.isOpened = true;

		if (window.innerWidth > TABLET_BREAKPOINT) {
			gsap.to(window, {
				scrollTo: { y: '#catalog-main', offsetY: this.filtersContainer.offsetHeight - 2 },
			});
			gsap.to(this.filtersWrapper, {
				width: document.body.clientWidth / 2,
				opacity: 1,
				duration: 0.3,
				ease: 'linear',
			});
			this.layout = Catalog.getLayout();
			Catalog.setLayout(2);
		} else {
			gsap.to(window, {
				scrollTo: {
					y: '#catalog-main',
					offsetY: this.filtersHeaderMobile.offsetHeight - 1,
				},
			});
			this.layout = Catalog.getLayout();
			gsap.set(this.filtersForm, { clearProps: true });
			gsap.set(this.filtersWrapper, { width: '100%', opacity: 1 });
			gsap.to(this.filtersWrapper, {
				x: 0,
				duration: 0.3,
				ease: 'linear',
			});
		}

		document.querySelector('.filters__layout').classList.add('no-pe');

		if (!this.accordions.length) {
			this.filtersForm
				.querySelectorAll('[data-accordion-toggle]')
				.forEach(toggle => this.accordions.push(new Accordion(toggle)));
		}

		window.addEventListener('keydown', this.onWindowKeydown);
	}
	close() {
		HTML_CLASSLIST.remove(ClassName.OPENED);
		this.isOpened = false;

		if (window.innerWidth > TABLET_BREAKPOINT) {
			this.layout && Catalog.setLayout(this.layout);
			gsap.to(this.filtersWrapper, {
				width: 0,
				opacity: 0,
				duration: 0.3,
				ease: 'linear',
				clearProps: true,
			});
		} else {
			this.layout && Catalog.setLayout(this.layout);
			gsap.set(this.filtersForm, { clearProps: true });
			gsap.set(this.filtersWrapper, { width: '100%' });
			gsap.to(this.filtersWrapper, {
				x: '-100%',
				duration: 0.3,
				ease: 'linear',
				clearProps: true,
			});
		}

		this.filtersContainer.classList.remove(ClassName.HIDDEN_NUM);

		document.querySelector('.filters__layout').classList.remove('no-pe');

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
