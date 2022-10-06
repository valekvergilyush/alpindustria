class WishlistForm {
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
			btn.addEventListener('click', () => {
				this.showNotification();
			});
		});
		this.closeBtn.forEach(btn => {
			btn.addEventListener('click', () => {
				this.hideNotification();
			});
		});
	}

	showNotification() {
		this.notification.classList.remove(this.hideClass);
	}

	hideNotification() {
		this.notification.classList.add(this.hideClass);
	}
}

export default new WishlistForm();
