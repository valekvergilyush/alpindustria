import Header from '../header/header';

const HTML_CLASSLIST = document.documentElement.classList;
const MOBILE_BREAKPOINT = 640;
const TABLET_BREAKPOINT = 992;

const ClassName = {
	ACTIVE: '_active',
	FILTERS_OPENED: '_filters-opened',
};

class Catalog {
	constructor() {
		this.init();
	}

	init() {
		this.layoutControls = document.querySelector('.filters__layout-buttons');
		this.catalogList = document.querySelector('.catalog__list');
		this.filtersWrapper = document.querySelector('.catalog__filters-wrapper');
		this.filtersPanel = document.querySelector('.page__filters');
		this.numbersContainer = document.querySelector('.filters__items-number');
		this.numbersContainer && (this.numbersContainerHeight = this.numbersContainer.offsetHeight);

		if (!this.layoutControls && !this.catalogList && !this.filtersWrapper) {
			return;
		}

		this.filtersForm = this.filtersWrapper.querySelector('.filters-form');

		this.setFiltersFormWidth();

		this.onLayoutButtonClick = this.onLayoutButtonClick.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);

		if (window.innerWidth <= MOBILE_BREAKPOINT) {
			this.layout = 2;
		} else if (window.innerWidth <= TABLET_BREAKPOINT) {
			this.layout = 3;
		} else {
			this.layout = 4;
		}

		this.setLayout(this.layout);

		this.layoutControls.addEventListener('click', this.onLayoutButtonClick);
		window.addEventListener('resize', this.onWindowResize);
	}
	onLayoutButtonClick(evt) {
		evt.preventDefault();

		if (window.innerWidth > 640) {
			gsap.to(window, {
				scrollTo: { y: '#main', offsetY: this.filtersPanel.offsetHeight },
				onComplete: () => {
					Header.hideHeader();
				},
			});
		} else {
			if (this.filtersPanel.classList.contains('_fixed')) {
				const offsetY =
					this.filtersPanel.querySelector('.filters__container').offsetHeight -
					this.numbersContainerHeight;

				gsap.to(window, {
					scrollTo: {
						y: '#main',
						offsetY: offsetY,
					},
					onComplete: () => {
						Header.hideHeader();
					},
				});
			} else {
				gsap.to(window, {
					scrollTo: {
						y: '#main',
						offsetY: this.filtersPanel.querySelector('.filters__container').offsetHeight,
					},
					onComplete: () => {
						Header.hideHeader();
					},
				});
			}
		}

		const value = evt.target.getAttribute('data-cols');

		if (value) {
			this.setLayout(value);
		}
	}
	setLayout(value) {
		const buttons = this.layoutControls.querySelectorAll(`[data-cols="${value}"]`);

		this.layoutControls
			.querySelectorAll(`.${ClassName.ACTIVE}`)
			.forEach(control => control.classList.remove(ClassName.ACTIVE));
		buttons.forEach(button => button.classList.add(ClassName.ACTIVE));

		this.layoutClassName && this.catalogList.classList.remove(this.layoutClassName);
		this.layout = Number(value);
		this.layoutClassName = `_cols-${value}`;
		this.catalogList.classList.add(this.layoutClassName);
	}
	getLayout() {
		return this.layout;
	}
	onWindowResize() {
		this.setFiltersFormWidth();

		if (window.innerWidth <= TABLET_BREAKPOINT && this.layout > 3) {
			this.setLayout(3);
		} else if (window.innerWidth <= MOBILE_BREAKPOINT && this.layout > 2) {
			this.setLayout(2);
		}

		if (this.layout === 1 && window.innerWidth > MOBILE_BREAKPOINT) {
			this.setLayout(2);
		} else if (this.layout === 2 && window.innerWidth > TABLET_BREAKPOINT) {
			this.setLayout(4);
		}
	}
	setFiltersFormWidth() {
		if (window.innerWidth > TABLET_BREAKPOINT) {
			const halfScreenWidth = `${document.body.clientWidth / 2}px`;

			if (HTML_CLASSLIST.contains(ClassName.FILTERS_OPENED)) {
				this.filtersWrapper.style.width = halfScreenWidth;
			}

			this.filtersForm.style.width = halfScreenWidth;
		}
	}
}
export default new Catalog();
