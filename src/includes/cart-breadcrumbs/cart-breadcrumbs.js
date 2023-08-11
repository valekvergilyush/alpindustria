class CartBreadcrumbs {
	constructor() {
		this.breadcrumbs = document.querySelectorAll('[data-cart-breadcrumb]');
		this.header = document.querySelector('.header');
		this.container = document.querySelector('.cart__delivery');
		this.secondContainer = document.querySelector('[data-popup="cart"]');
		this.popupWrap = document.querySelector('[data-popup-wrapper="cart"]');
		this.init();
	}

	init() {
		if (!this.container) {
			return;
		}
		this.breadcrumbs.forEach(link => {
			link.addEventListener('click', this._onLinkClick.bind(this));
		});
	}
	_onLinkClick(e) {
		e.preventDefault();
		const currentSection = document.querySelector(e.currentTarget.hash);
		if (currentSection) {
			if (this.popupWrap) {
				this.popupWrap.scrollTo({
					top: 1000,
					behavior: 'smooth',
				});
			}
			if (this.secondContainer) {
				this.secondContainer.scrollTo({
					top: currentSection.offsetTop - (this.header && this.header.scrollHeight),
					behavior: 'smooth',
				});
			}
			if (this.container) {
				this.container.scrollTo({
					top: currentSection.offsetTop - (this.header && this.header.scrollHeight),
					behavior: 'smooth',
				});
			}
		}
	}
}

export default new CartBreadcrumbs();
