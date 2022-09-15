const ClassName = {
	FIXED: '_fixed',
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

		this.onWindowScroll = this.onWindowScroll.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);

		window.addEventListener('scroll', this.onWindowScroll);
		window.addEventListener('resize', this.onWindowResize);
	}
	onWindowScroll() {
		this.scrollY = window.scrollY;
		this.filtersElementPos = this.filtersElement.getBoundingClientRect().top;

		if (this.filtersElementPos < 0) {
			this.filtersElement.classList.add(ClassName.FIXED);
		} else {
			this.filtersElement.classList.remove(ClassName.FIXED);
		}

		if (document.body.getBoundingClientRect().top > this.scrollPos) {
			// scroll UP

			this.showHeader();
		} else {
			// scroll DOWN

			this.hideHeader();
		}
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
		this.isHeaderHidden = !this.isHeaderHidden;
		gsap.to(this.headerElement, {
			yPercent: 0,
			duration: 0.1,
			ease: 'linear',
		});
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
