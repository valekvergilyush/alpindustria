import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const HTML_CLASSLIST = document.documentElement.classList;

const ClassName = {
	INITIALIZED: '_initialized',
	OPENED: '_opened',
	MENU_OPENED: '_menu-opened',
};

class Header {
	constructor() {
		this.init();
	}
	init() {
		this.menu = document.querySelector('[data-menu]');

		if (!this.menu) {
			return;
		}

		this.menuOpener = document.querySelector('[data-menu-opener]');
		this.menuImg = document.querySelector('[data-menu-img]');
		this.menuImgLinks = document.querySelectorAll('[data-menu-img-src]');

		this.menuImgLinks.forEach(link => {
			const imgSrc = link.getAttribute('data-menu-img-src');
			const imgSrcset = link.getAttribute('data-menu-img-srcset');

			link.addEventListener('mouseenter', () => {
				this.menuImg.src = imgSrc;
				this.menuImg.srcset = imgSrcset;
				this.menuImg.classList.add(ClassName.OPENED);
			});
		});

		this.isMenuOpened = false;

		this.onWindowKeydown = this.onWindowKeydown.bind(this);
		this.onMenuOpenerClick = this.onMenuOpenerClick.bind(this);

		window.addEventListener('keydown', this.onWindowKeydown);

		this.menuOpener.addEventListener('click', this.onMenuOpenerClick);
		this.menu.classList.add(ClassName.INITIALIZED);
	}
	openMenu() {
		HTML_CLASSLIST.add(ClassName.MENU_OPENED);
		this.menuOpener.classList.add(ClassName.OPENED);
		this.isMenuOpened = !this.isMenuOpened;
		disableBodyScroll(this.menu);
	}
	closeMenu() {
		HTML_CLASSLIST.remove(ClassName.MENU_OPENED);
		this.menuOpener.classList.remove(ClassName.OPENED);
		this.menuImg.classList.remove(ClassName.OPENED);
		this.isMenuOpened = !this.isMenuOpened;
		enableBodyScroll(this.menu);
	}
	toggleMenu() {
		this.isMenuOpened ? this.closeMenu() : this.openMenu();
	}
	onMenuOpenerClick(evt) {
		evt.preventDefault();

		if (HTML_CLASSLIST.contains('_search-opened')) {
			window.ProjectApp.modules.Search.close();

			clearTimeout(this.TO);
			this.TO = setTimeout(() => {
				this.toggleMenu();
			}, 300);
		} else {
			this.toggleMenu();
		}
	}
	onWindowKeydown(evt) {
		if (evt.key === 'Escape') {
			this.closeMenu();
		}
	}
}

export default new Header();
