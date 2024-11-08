import PageScroll from '../../assets/js/utils/scroll-lock';

const HTML_CLASSLIST = document.documentElement.classList;

const ClassName = {
	INITIALIZED: '_initialized',
	OPENED: '_opened',
	MENU_OPENED: '_menu-opened',
};

class Menu {
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
		this.cartOpener = document.querySelector('[data-popup-opener="cart"]');
		this.dropdownToggles = this.menu.querySelectorAll('[data-menu-accordion-toggle]');
		this.dropdownInnerToggles = this.menu.querySelectorAll('[data-menu-accordion-inner-toggle]');

		this.cartOpener.addEventListener('click', () => {
			this.closeMenu();
		});

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
		this.menu.animating = false;

		this.onWindowKeydown = this.onWindowKeydown.bind(this);
		this.onMenuOpenerClick = this.onMenuOpenerClick.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);

		window.addEventListener('keydown', this.onWindowKeydown);
		window.addEventListener('resize', this.onWindowResize);

		this.menuOpener.addEventListener('click', this.onMenuOpenerClick);
		this.menu.classList.add(ClassName.INITIALIZED);

		this.activeToggle = null;
		this.activeInnerToggle = null;

		const toggleHeight = toggleButton => {
			const content = toggleButton.nextElementSibling;

			this.activeToggle.parentElement.classList.contains(ClassName.OPENED)
				? gsap.to(content, {
						height: content.scrollHeight,
						duration: 0.3,
						ease: 'Power2.out',
						onComplete: () => {
							gsap.set(content, {
								height: 'auto',
							});
						},
				  })
				: gsap.to(content, {
						height: 0,
						duration: 0.3,
						ease: 'Power2.out',
				  });
		};
		const toggleInnerHeight = accordion => {
			accordion.classList.contains(ClassName.OPENED)
				? gsap.to(accordion, {
						height: accordion.scrollHeight,
						duration: 0.3,
						ease: 'Power2.out',
						onComplete: () => {
							gsap.set(accordion, {
								height: 'auto',
							});
						},
				  })
				: gsap.to(accordion, {
						height: getComputedStyle(accordion).getPropertyValue('--item-height'),
						duration: 0.3,
						ease: 'Power2.out',
				  });
		};

		this.dropdownToggles.forEach(toggle => {
			toggle.addEventListener('click', evt => {
				evt.preventDefault();

				if (toggle === this.activeToggle || this.activeToggle === null) {
					this.activeToggle = toggle;
					this.activeToggle.parentElement.classList.toggle(ClassName.OPENED);
					toggleHeight(toggle);
				} else {
					this.activeToggle.parentElement.classList.remove(ClassName.OPENED);
					toggleHeight(this.activeToggle);
					this.activeToggle = toggle;
					this.activeToggle.parentElement.classList.toggle(ClassName.OPENED);
					toggleHeight(this.activeToggle);
				}
			});
		});

		this.dropdownInnerToggles.forEach(toggle => {
			toggle.addEventListener('click', evt => {
				evt.preventDefault();

				if (toggle === this.activeInnerToggle || this.activeInnerToggle === null) {
					this.activeInnerToggle = toggle;
					this.activeInnerToggle.parentElement.classList.toggle(ClassName.OPENED);
					toggleInnerHeight(this.activeInnerToggle.parentElement);
				} else {
					this.activeInnerToggle.parentElement.classList.remove(ClassName.OPENED);
					toggleInnerHeight(this.activeInnerToggle.parentElement);
					this.activeInnerToggle = toggle;
					this.activeInnerToggle.parentElement.classList.toggle(ClassName.OPENED);
					toggleInnerHeight(this.activeInnerToggle.parentElement);
				}
			});
		});

		this.onResizeAccordion = () => {
			if (window.innerWidth > 1280) {
				this.dropdownInnerToggles.forEach(toggle => {
					toggle.parentElement.classList.remove(ClassName.OPENED);
					toggle.parentElement.removeAttribute('style');
				});

				this.menu.querySelectorAll(['data-menu-accordion-content']).forEach(content => {
					content.removeAttribute('style');
				});
			}
		};

		this.onResizeAccordion();
	}
	openMenu() {
		HTML_CLASSLIST.add(ClassName.MENU_OPENED);
		this.menuOpener.classList.add(ClassName.OPENED);
		this.isMenuOpened = !this.isMenuOpened;
		PageScroll.disabled(this.menu);
		this.onWindowResize();
	}
	closeMenu() {
		if (!this.isMenuOpened) {
			return;
		}
		HTML_CLASSLIST.remove(ClassName.MENU_OPENED);
		this.menuOpener.classList.remove(ClassName.OPENED);
		this.menuImg.classList.remove(ClassName.OPENED);
		this.isMenuOpened = false;
		PageScroll.enabled(this.menu);
	}
	toggleMenu() {
		this.menu.animating = true;
		this.isMenuOpened ? this.closeMenu() : this.openMenu();
		this.animTO = setTimeout(() => {
			this.menu.animating = false;
		}, 300);
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
	onWindowResize() {
		if (this.isMenuOpened) {
			this.menu.style.setProperty('--img-width', `${this.menuImg.offsetWidth}px`);
		}

		this.onResizeAccordion();
	}
}

export default new Menu();
