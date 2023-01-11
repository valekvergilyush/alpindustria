import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import env from '../utils/env';
import Signal from '../classes/Signal';
import Accordion from './Accordion';

const HTML_CLASSLIST = document.documentElement.classList;

const ClassName = {
	OPENED_MENU: '_menu-opened',
};

const Animation = {
	RTL: 'RTL',
};

const TABLET_BREAKPOINT = 768;

const documentClassList = document.documentElement.classList;

class Popups {
	constructor() {
		this.init();
	}
	init() {
		this.onOpen = new Signal();
		this.onOpened = new Signal();
		this.onClose = new Signal();
		this.onCloseStart = new Signal();

		this.opened = false;
		this.openedClass = '';

		this.wrapper = document.querySelector('[data-popups]');

		this.activePopup = null;
		this.activePopupName = '';
		this.popupsRoot = document.querySelector('[data-popups]');
		this.popups = document.querySelectorAll('[data-popup-wrapper]');
		this.closeButton = document.querySelector('.popups__close-button.close-button');

		Array.from(document.querySelectorAll('[data-popup-opener]')).forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault();
				const popupName = e.currentTarget.getAttribute('data-popup-opener');
				window.history.pushState({}, '', `#${popupName}`);
				this.open(popupName);
			});
		});

		Array.from(document.querySelectorAll('[data-popup-closer]')).forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault();
				this.close();
			});
		});

		window.addEventListener('keydown', e => {
			if (this.opened && e.keyCode === 27) {
				this.close();
			}
		});

		this.wrapper.addEventListener('click', e => {
			if (this.opened) {
				if (e.target === this.wrapper) {
					this.close();
				}
			}
		});

		this.mqTablet = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT}px)`);

		const onWindowWidthChange = evt => {
			if (evt.matches) {
				this.close();
			} else {
				this.close();
			}
		};

		this.mqTablet.addEventListener('change', onWindowWidthChange);
		onWindowWidthChange(this.mqTablet);
	}
	open(name) {
		if (this.activePopupName === name) {
			return;
		}

		if (this.opened) {
			this.close(true);
		}

		const popup = this.wrapper.querySelector('[data-popup-wrapper="' + name + '"]');
		let popupAnimation;
		if (popup) {
			popupAnimation = popup.getAttribute('data-popup-animation');
		}

		if (!HTML_CLASSLIST.contains(ClassName.OPENED_MENU) && !env.isIOS) {
			disableBodyScroll(this.popupsRoot);
		}

		if (!popup) {
			console.log('No popup for ' + name + ' opener');
			return;
		}

		this.opened = true;
		this.activePopup = popup;
		this.activePopupName = name;

		this.wrapper.classList.add('_' + name);

		this.wrapper.classList.remove('no-pe');

		gsap.to(this.wrapper, {
			duration: 0.35,
			autoAlpha: 1,
			overwrite: true,
			display: 'flex',
		});

		const onWindowWidthChange = evt => {
			if (evt.matches) {
				this.openAnimation = gsap.fromTo(
					this.activePopup,
					{ yPercent: 100, display: 'flex' },
					{
						yPercent: 0,
						duration: 0.35,
						onComplete: () => {
							const focusElement = this.activePopup.querySelector('[data-popup-focus]');
							if (focusElement) {
								focusElement.focus && focusElement.focus();
							}
							this.initPopupAccordions(popup);
							if (popup.scrollHeight > window.innerHeight) {
								const inner = popup.querySelector('[data-popup]');
								inner.style.overflow = 'hidden';
								popup.addEventListener('scroll', () => {
									if (popup.scrollTop >= Number.parseInt(getComputedStyle(inner).marginTop, 10)) {
										inner.style.overflow = 'auto';
									} else {
										if (popup.scrollTop === 0) {
											inner.style.overflow = 'hidden';
										}
									}
								});
							}
						},
						paused: true,
					}
				);
			} else {
				this.openAnimation = gsap.fromTo(
					this.activePopup,
					{ xPercent: 100, display: 'flex' },
					{
						xPercent: 0,
						duration: 0.35,
						onComplete: () => {
							const focusElement = this.activePopup.querySelector('[data-popup-focus]');
							if (focusElement) {
								focusElement.focus && focusElement.focus();
							}
							this.initPopupAccordions(popup);
						},
						paused: true,
					}
				);
			}
		};

		if (popupAnimation === Animation.RTL) {
			this.mqTablet.addEventListener('change', onWindowWidthChange);
			onWindowWidthChange(this.mqTablet);
			this.openAnimation.play();
		} else {
			gsap.fromTo(
				this.activePopup,
				{ autoAlpha: 0, scale: 0.98, display: 'flex' },
				{
					duration: 0.35,
					autoAlpha: 1,
					scale: 1,
					onComplete: () => {
						const focusElement = this.activePopup.querySelector('[data-popup-focus]');
						if (focusElement) {
							focusElement.focus && focusElement.focus();
						}
						this.onOpened.call(popup);
						this.initPopupAccordions(popup);
					},
				}
			);
		}

		documentClassList.add('_popup-opened');

		this.openedClass = '_popup-opened-' + name;
		documentClassList.add(this.openedClass);

		this.onOpen.call(popup);
	}
	close(immediate = false) {
		if (this.opened) {
			this.opened = false;

			this.wrapper.classList.remove('_' + this.activePopupName);

			this.onCloseStart.call(this.activePopupName);

			this.activePopupName = '';

			this.wrapper.classList.add('no-pe');

			const popupAnimation = this.activePopup.getAttribute('data-popup-animation');

			gsap.to(this.wrapper, 0.35, { duration: 0.35, autoAlpha: 0, display: 'none' });

			const onWindowWidthChange = evt => {
				if (evt.matches) {
					this.closeAnimation = gsap.to(this.activePopup, {
						duration: immediate ? 0 : 0.35,
						yPercent: 100,
						display: 'none',
						onComplete: () => {
							this.onClose.call();
						},
						paused: true,
					});
				} else {
					this.closeAnimation = gsap.to(this.activePopup, {
						duration: immediate ? 0 : 0.35,
						xPercent: 100,
						display: 'none',
						onComplete: () => {
							this.onClose.call();
						},
						paused: true,
					});
				}
			};

			if (popupAnimation === Animation.RTL) {
				this.mqTablet.addEventListener('change', onWindowWidthChange);
				onWindowWidthChange(this.mqTablet);
				this.closeAnimation.play();
			} else {
				gsap.to(this.activePopup, {
					duration: immediate ? 0 : 0.35,
					autoAlpha: 0,
					scale: 0.98,
					display: 'none',
					onComplete: () => {
						this.onClose.call();
					},
				});
			}

			if (!HTML_CLASSLIST.contains(ClassName.OPENED_MENU) && !env.isIOS) {
				enableBodyScroll(this.popupsRoot);
			}

			documentClassList.remove('_popup-opened');

			if (this.openedClass !== '') {
				documentClassList.remove(this.openedClass);
				this.openedClass = '';
			}
			this.stopIframeVideos();
			window.history.pushState(
				'',
				document.title,
				window.location.pathname + window.location.search
			);
		}
	}
	getPopup(name) {
		return this.wrapper.querySelector('[data-popup-wrapper="' + name + '"]');
	}
	initPopupAccordions(popup) {
		if (!popup.accorions) {
			popup.accorions = [];
			popup
				.querySelectorAll('[data-accordion-toggle]')
				.forEach(toggle => popup.accorions.push(new Accordion(toggle)));
		}
	}
	stopIframeVideos() {
		this.wrapper.querySelectorAll('iframe').forEach(iframe => {
			const src = iframe.src;
			iframe.src = '';
			iframe.src = src;
		});
	}
}

export default new Popups();
