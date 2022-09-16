import ScrollHelper from '../../assets/js/helpers/ScrollHelper';

const HTML_CLASSLIST = document.documentElement.classList;

const ClassName = {
	FIXED: '_fixed',
	FILTERS_OPENED: '_filters-opened',
};

const Direction = {
	UP: 'up',
	DOWN: 'down',
};

class Header {
	constructor() {
		this.init();
	}
	init() {
		this.headerElement = document.querySelector('.page__header');

		if (!this.headerElement) {
			return;
		}

		this.isHeaderHidden = false;
		this.scrollPos = 0;
		this.filtersElement = document.querySelector('.page__filters');
		this.filtersElementPos = this.filtersElement.getBoundingClientRect().top;
		ScrollHelper.onDirectionChange.add(direction => this.onWindowScroll(direction));

		this.onWindowScroll = this.onWindowScroll.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);

		// window.addEventListener('scroll', this.onWindowScroll);
		window.addEventListener('resize', this.onWindowResize);
	}
	onWindowScroll(direction) {
		this.scrollY = window.scrollY;
		this.filtersElementPos = this.filtersElement.getBoundingClientRect().top;

		if (this.filtersElementPos < 0) {
			this.filtersElement.classList.add(ClassName.FIXED);
		} else {
			this.filtersElement.classList.remove(ClassName.FIXED);
		}

		if (direction === Direction.UP) {
			this.showHeader();
		}
		if (direction === Direction.DOWN) {
			this.hideHeader();
		}
		// if (document.body.getBoundingClientRect().top > this.scrollPos) {
		// 	// scroll UP

		// 	this.showHeader();
		// } else {
		// 	// scroll DOWN

		// 	this.hideHeader();
		// }
		this.scrollPos = document.body.getBoundingClientRect().top;
	}
	onWindowResize() {
		this.filtersElementPos = this.filtersElement.getBoundingClientRect().top;
	}
	showHeader() {
		if (this.scrollY !== 0) {
			this.headerElement.classList.add(ClassName.FIXED);
		} else {
			this.headerElement.classList.remove(ClassName.FIXED);
		}
		if (!HTML_CLASSLIST.contains(ClassName.FILTERS_OPENED) || this.filtersElementPos > 0) {
			this.isHeaderHidden = !this.isHeaderHidden;
			gsap.to(this.headerElement, {
				yPercent: 0,
				duration: 0.1,
				ease: 'linear',
			});
		}
	}
	hideHeader() {
		this.isHeaderHidden = !this.isHeaderHidden;
		gsap.to(this.headerElement, {
			yPercent: -100,
			duration: 0.1,
			ease: 'linear',
		});
	}
}

export default new Header();
