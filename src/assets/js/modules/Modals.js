import ScrollLock from '../utils/scroll-lock';
import Signal from '../classes/Signal';
import Accordion from './Accordion';

const HTML_CLASSLIST = document.documentElement.classList;

const ClassName = {
	OPENED_MENU: '_menu-opened',
	OPENED_POPUP: '_popup-opened',
};

const Animation = {
	RTL: 'RTL',
};

const TABLET_BREAKPOINT = 768;

const documentClassList = document.documentElement.classList;

class Modals {
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

		this.wrapper = document.querySelector('[data-modals]');

		this.activeModal = null;
		this.activeModalName = '';
		this.modalsRoot = document.querySelector('[data-modals]');
		this.modals = document.querySelectorAll('[data-modal-wrapper]');
		this.closeButton = document.querySelector('.modals__close-button.close-button');

		Array.from(document.querySelectorAll('[data-modal-opener]')).forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault();
				const modalName = e.currentTarget.getAttribute('data-modal-opener');
				this.open(modalName);
			});
		});

		Array.from(document.querySelectorAll('[data-modal-closer]')).forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault();
				this.close();
			});
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
		if (this.activeModalName === name) {
			return;
		}

		if (this.opened) {
			this.close(true);
		}

		const modal = this.wrapper.querySelector('[data-modal-wrapper="' + name + '"]');
		let modalAnimation;
		if (modal) {
			modalAnimation = modal.getAttribute('data-modal-animation');
		}

		if (
			!HTML_CLASSLIST.contains(ClassName.OPENED_MENU) &&
			!HTML_CLASSLIST.contains(ClassName.OPENED_POPUP)
		) {
			ScrollLock.enable();
		}

		if (!modal) {
			console.log('No modal for ' + name + ' opener');
			return;
		}

		this.opened = true;
		this.activeModal = modal;
		this.activeModalName = name;

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
					this.activeModal,
					{ yPercent: 100, display: 'flex' },
					{
						yPercent: 0,
						duration: 0.35,
						clearProps: 'transform',
						onComplete: () => {
							const focusElement = this.activeModal.querySelector('[data-modal-focus]');
							if (focusElement) {
								focusElement.focus && focusElement.focus();
							}
							this.initModalAccordions(modal);
							if (modal.scrollHeight > window.innerHeight) {
								const inner = modal.querySelector('[data-modal]');
								inner.style.overflow = 'hidden';
								modal.addEventListener('scroll', () => {
									if (modal.scrollTop >= Number.parseInt(getComputedStyle(inner).marginTop, 10)) {
										inner.style.overflow = 'auto';
									} else {
										if (modal.scrollTop === 0) {
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
					this.activeModal,
					{ xPercent: 100, display: 'flex' },
					{
						xPercent: 0,
						duration: 0.35,
						onComplete: () => {
							const focusElement = this.activeModal.querySelector('[data-modal-focus]');
							if (focusElement) {
								focusElement.focus && focusElement.focus();
							}
							this.initModalAccordions(modal);
						},
						paused: true,
					}
				);
			}
		};

		if (modalAnimation === Animation.RTL) {
			this.mqTablet.addEventListener('change', onWindowWidthChange);
			onWindowWidthChange(this.mqTablet);
			this.openAnimation.play();
		} else {
			gsap.fromTo(
				this.activeModal,
				{ autoAlpha: 0, scale: 0.98, display: 'flex' },
				{
					duration: 0.35,
					autoAlpha: 1,
					scale: 1,
					onComplete: () => {
						const focusElement = this.activeModal.querySelector('[data-modal-focus]');
						if (focusElement) {
							focusElement.focus && focusElement.focus();
						}
						this.onOpened.call(modal);
						this.initModalAccordions(modal);
					},
				}
			);
		}

		documentClassList.add('_modal-opened');

		this.openedClass = '_modal-opened-' + name;
		documentClassList.add(this.openedClass);

		this.onOpen.call(modal);
	}
	close(immediate = false) {
		if (this.opened) {
			this.opened = false;

			this.wrapper.classList.remove('_' + this.activeModalName);

			this.onCloseStart.call(this.activeModalName);

			this.activeModalName = '';

			this.wrapper.classList.add('no-pe');

			const modalAnimation = this.activeModal.getAttribute('data-modal-animation');

			gsap.to(this.wrapper, 0.35, { duration: 0.35, autoAlpha: 0, display: 'none' });

			const onWindowWidthChange = evt => {
				if (evt.matches) {
					this.closeAnimation = gsap.to(this.activeModal, {
						duration: immediate ? 0 : 0.35,
						yPercent: 100,
						display: 'none',
						onComplete: () => {
							this.onClose.call();
						},
						paused: true,
					});
				} else {
					this.closeAnimation = gsap.to(this.activeModal, {
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

			if (modalAnimation === Animation.RTL) {
				this.mqTablet.addEventListener('change', onWindowWidthChange);
				onWindowWidthChange(this.mqTablet);
				this.closeAnimation.play();
			} else {
				gsap.to(this.activeModal, {
					duration: immediate ? 0 : 0.35,
					autoAlpha: 0,
					scale: 0.98,
					display: 'none',
					onComplete: () => {
						this.onClose.call();
					},
				});
			}

			documentClassList.remove('_modal-opened');

			if (this.openedClass !== '') {
				documentClassList.remove(this.openedClass);
				this.openedClass = '';
			}
			this.stopIframeVideos();

			if (
				!HTML_CLASSLIST.contains(ClassName.OPENED_MENU) &&
				!HTML_CLASSLIST.contains(ClassName.OPENED_POPUP)
			) {
				ScrollLock.disable();
			}
		}
	}
	getModal(name) {
		return this.wrapper.querySelector('[data-modal-wrapper="' + name + '"]');
	}
	initModalAccordions(modal) {
		if (!modal.accorions) {
			modal.accorions = [];
			modal
				.querySelectorAll('[data-accordion-toggle]')
				.forEach(toggle => modal.accorions.push(new Accordion(toggle)));
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

export default new Modals();
