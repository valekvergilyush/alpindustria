import ScrollHelper from '../../assets/js/helpers/ScrollHelper';
import utils from '../../assets/js/utils/utils';

const HTML_CLASSLIST = document.documentElement.classList;

const ClassName = {
	FIXED: '_fixed',
	HEADER_OPENED: '_header-opened',
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
		this.filtersElement = document.querySelector('.page__filters');
		this.timeline = document.querySelector('[data-timeline]');

		this.onWindowScroll = this.onWindowScroll.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);

		if (this.filtersElement) {
			this.filtersElementPos = this.filtersElement.getBoundingClientRect().top;
		}

		this.headerElementHeight = this.headerElement.offsetHeight;
		ScrollHelper.onScroll.add(y => this.onWindowScroll(y));
		ScrollHelper.onDirectionChange.add(direction => this._directionChangeController(direction));

		window.addEventListener('resize', this.onWindowResize);

		const currentScrollTop = utils.getCurrentScrollTop();
		this.onWindowScroll(currentScrollTop);
	}
	_directionChangeController(direction) {
		this.direction = direction;

		if (this.direction === Direction.UP) {
			this.showHeader();
		}
		if (this.direction === Direction.DOWN) {
			this.hideHeader();
		}
	}
	onWindowScroll(y) {
		this.scrollY = y;
		if (this.scrollY < this.headerElementHeight * 1.5) {
			this.headerElement.classList.remove(ClassName.FIXED);
		} else {
			this.headerElement.classList.add(ClassName.FIXED);
		}

		if (this.filtersElementPos > 0 && this.direction === Direction.UP) {
			this.showHeader();
		}

		if (this.filtersElement) {
			this.filtersElementPos = this.filtersElement.getBoundingClientRect().top;

			if (this.filtersElementPos < 0) {
				this.filtersElement.classList.add(ClassName.FIXED);
			} else {
				this.filtersElement.classList.remove(ClassName.FIXED);
			}
		}
		HTML_CLASSLIST.add('is-header-inited');
	}
	onWindowResize() {
		this.headerElementHeight = this.headerElement.offsetHeight;
		if (this.filtersElement) {
			this.filtersElementPos = this.filtersElement.getBoundingClientRect().top;
		}
	}
	showHeader() {
		this.isFilterNotOpened = true;
		if (this.filtersElement) {
			this.isFilterNotOpened =
				!HTML_CLASSLIST.contains(ClassName.FILTERS_OPENED) || this.filtersElementPos > 0;
		}
		if (this.isFilterNotOpened || this.scrollY === 0) {
			this.isHeaderHidden = !this.isHeaderHidden;
			gsap.to(this.headerElement, {
				yPercent: 0,
				duration: 0.1,
				ease: 'linear',
			});
			this.timeline &&
				gsap.to(this.timeline, {
					top: this.headerElement.offsetHeight,
					duration: 0.1,
					ease: 'linear',
				});
			HTML_CLASSLIST.add(ClassName.HEADER_OPENED);
		}
	}
	hideHeader() {
		this.isHeaderHidden = !this.isHeaderHidden;
		gsap.to(this.headerElement, {
			yPercent: -100,
			duration: 0.1,
			ease: 'linear',
			onComplete: () => {
				this.headerElement.classList.remove(ClassName.FIXED);
				HTML_CLASSLIST.remove(ClassName.HEADER_OPENED);
			},
		});
		this.timeline &&
			gsap.to(this.timeline, {
				top: 0,
				duration: 0.1,
				ease: 'linear',
			});
	}
}

export default new Header();
