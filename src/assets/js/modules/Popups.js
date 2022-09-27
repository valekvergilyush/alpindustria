import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import Signal from '../classes/Signal';

const documentClassList = document.documentElement.classList;

class Popups {
	constructor() {
		this.init();
	}
	init() {
		this.onOpen = new Signal();
		this.onClose = new Signal();
		this.onCloseStart = new Signal();

		this.opened = false;
		this.openedClass = '';

		this.wrapper = document.querySelector('[data-popups]');

		this.activePopup = null;
		this.activePopupName = '';
		this.popups = document.querySelectorAll('[data-popup]');
		this.closeButton = document.querySelector('.popups__close-button.close-button');

		Array.from(document.querySelectorAll('[data-popup-opener]')).forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault();
				this.open(e.currentTarget.getAttribute('data-popup-opener'));
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
	}
	open(name) {
		if (this.activePopupName === name) {
			return;
		}

		if (this.opened) {
			this.close(true);
		}

		const popup = this.wrapper.querySelector('[data-popup="' + name + '"]');
		const overlay = this.wrapper.querySelector('.popups__overlay');
		const icon = this.wrapper.querySelector('.popups__icon');
		if (!documentClassList.contains('_modal-opened') && !documentClassList.contains('_safari')) {
			disableBodyScroll(popup);
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
		// wrapper
		gsap.set(this.wrapper, { display: 'flex' });
		// overlay
		gsap.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 });
		// popup
		gsap.fromTo(popup, { xPercent: 100 }, { duration: 0.35, xPercent: 0 });
		// icon
		gsap.fromTo(icon, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, delay: 0.35 });

		documentClassList.add('_popup-opened');

		this.openedClass = '_popup-opened-' + name;
		documentClassList.add(this.openedClass);

		this.onOpen.call();
	}
	close(immediate = false) {
		if (this.opened) {
			this.opened = false;

			this.wrapper.classList.remove('_' + this.activePopupName);

			this.onCloseStart.call(this.activePopupName);

			this.activePopupName = '';

			this.wrapper.classList.add('no-pe');
			const overlay = this.wrapper.querySelector('.popups__overlay');
			const icon = this.wrapper.querySelector('.popups__icon');
			// wrapper
			gsap.set(this.wrapper, {
				delay: 0.35,
				display: 'none',
				onComplete: () => {
					this.onClose.call();
				},
			});
			// overlay
			gsap.to(overlay, { duration: 0.35, autoAlpha: 0 });
			// popup
			gsap.to(this.activePopup, { duration: 0.35, xPercent: 100 });
			// icon
			gsap.to(icon, { duration: 0.35, autoAlpha: 0 });

			if (!documentClassList.contains('_modal-opened') && !documentClassList.contains('_safari')) {
				enableBodyScroll(this.activePopup);
			}

			documentClassList.remove('_popup-opened');

			if (this.openedClass !== '') {
				documentClassList.remove(this.openedClass);
				this.openedClass = '';
			}
		}
	}
	getPopup(name) {
		return this.wrapper.querySelector('[data-popup="' + name + '"]');
	}
}

export default new Popups();
