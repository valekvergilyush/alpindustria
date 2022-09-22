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

		this.menuOpener = document.querySelector('[data-menu-opener]');
		this.menu = document.querySelector('[data-menu]');

		this.isMenuOpened = false;
		this.isHeaderHidden = false;
		this.filtersElement = document.querySelector('.page__filters');
		if (this.filtersElement) {
			this.filtersElementPos = this.filtersElement.getBoundingClientRect().top;
		}
		this.headerElementHeight = this.headerElement.offsetHeight;
		ScrollHelper.onScroll.add(y => this.onWindowScroll(y));
		ScrollHelper.onDirectionChange.add(direction => this._directionChangeController(direction));

		this.onWindowScroll = this.onWindowScroll.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);
		this.onWindowKeydown = this.onWindowKeydown.bind(this);
		this.onMenuOpenerClick = this.onMenuOpenerClick.bind(this);

		window.addEventListener('resize', this.onWindowResize);
		window.addEventListener('keydown', this.onWindowKeydown);

		this.menuOpener.addEventListener('click', this.onMenuOpenerClick);
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

		if (this.filtersElement) {
			this.filtersElementPos = this.filtersElement.getBoundingClientRect().top;

			if (this.filtersElementPos < 0) {
				this.filtersElement.classList.add(ClassName.FIXED);
			} else {
				this.filtersElement.classList.remove(ClassName.FIXED);
			}
		}
	}
	onWindowResize() {
		this.headerElementHeight = this.headerElement.offsetHeight;
		if (this.filtersElement) {
			this.filtersElementPos = this.filtersElement.getBoundingClientRect().top;
		}
	}
	showHeader() {
		let isFilterNotOpened = true;
		if (this.filtersElement) {
			isFilterNotOpened =
				!HTML_CLASSLIST.contains(ClassName.FILTERS_OPENED) || this.filtersElementPos > 0;
		}
		if (isFilterNotOpened) {
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
			onComplete: () => {
				this.headerElement.classList.remove(ClassName.FIXED);
			},
		});
	}
	openMenu() {
		HTML_CLASSLIST.add('_menu-opened');
		this.isMenuOpened = !this.isMenuOpened;
	}
	closeMenu() {
		HTML_CLASSLIST.remove('_menu-opened');
		this.isMenuOpened = !this.isMenuOpened;
	}
	toggleMenu() {
		this.isMenuOpened ? this.closeMenu() : this.openMenu();
	}
	onMenuOpenerClick(evt) {
		evt.preventDefault();

		this.toggleMenu();
	}
	onWindowKeydown(evt) {
		if (evt.key === 'Escape') {
			this.closeMenu();
		}
	}
}

export default new Header();
