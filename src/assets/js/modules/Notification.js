class Notification {
	constructor() {
		this.notification = document.querySelector('[data-notification]');
		this.openBtn = document.querySelectorAll('[data-notification-open]');
		this.closeBtn = document.querySelectorAll('[data-notification-close]');
		this.hideClass = '_hide';
		this.init();
	}
	init() {
		if (!this.notification) {
			return;
		}
		this.openBtn.forEach(btn => {
			btn.addEventListener('click', evt => {
				const popupName = evt.target.getAttribute('data-notification-open');
				this.show(popupName);
			});
		});
		this.closeBtn.forEach(btn => {
			btn.addEventListener('click', () => {
				this.hide();
			});
		});
		window.addEventListener('keydown', evt => {
			if (evt.key === 'Escape') {
				this.hide();
			}
		});
	}

	show(name) {
		this.notification.classList.remove(this.classMod);
		this.classMod = `_${name}`;
		this.notification.classList.add(this.classMod);
		this.notification.classList.remove(this.hideClass);
	}

	hide() {
		this.notification.classList.add(this.hideClass);
		this.notification.classList.remove(this.classMod);
	}
}

export default new Notification();
