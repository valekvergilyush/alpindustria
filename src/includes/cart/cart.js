const ClassName = {
	OPENED_DELIVERY: '_opened-delivery',
	OPENED_PAY: '_opened-pay',
	HIDDEN: 'hidden',
	ANIMATION: '_animation',
};

const TABLET_BREAKPOINT = 992;

class Cart {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.cart');

		if (!this.container) {
			return;
		}

		this.popupWrapper = document.querySelector('[data-popup-wrapper=cart]');
		this.deliveryOpener = this.container.querySelector('[data-cart-delivery-opener]');
		this.backButtons = this.container.querySelectorAll('[data-cart-back]');
		this.payButton = this.container.querySelector('[data-cart-pay]');

		this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
		this.onBackButtonClick = this.onBackButtonClick.bind(this);
		this.onPayButtonClick = this.onPayButtonClick.bind(this);

		this.deliveryOpener.addEventListener('click', this.onSubmitButtonClick);
		this.payButton.addEventListener('click', this.onPayButtonClick);
		this.backButtons.forEach(button => button.addEventListener('click', this.onBackButtonClick));
	}
	onSubmitButtonClick(evt) {
		evt.preventDefault();

		this.openDelivery();
	}
	onBackButtonClick(evt) {
		evt.preventDefault();

		if (
			evt.target.getAttribute('data-cart-back') === 'delivery' &&
			this.popupWrapper.classList.contains(ClassName.OPENED_PAY)
		) {
			this.openDelivery();
		} else {
			this.openDefault();
		}
	}
	onPayButtonClick(evt) {
		evt.preventDefault();

		this.openPay();
	}
	openDelivery() {
		this.popupWrapper.classList.add(ClassName.ANIMATION);
		if (this.popupWrapper.classList.contains(ClassName.OPENED_PAY)) {
			this.popupWrapper.classList.remove(ClassName.OPENED_PAY);
			this.popupWrapper.classList.remove(ClassName.ANIMATION);
		} else {
			this.popupWrapper.classList.add(ClassName.OPENED_DELIVERY);
			gsap.to(this.popupWrapper, {
				width: '100%',
				duration: 0.3,
				onComplete: () => {
					this.popupWrapper.classList.remove(ClassName.ANIMATION);
				},
			});
		}
	}
	openDefault() {
		this.popupWrapper.classList.add(ClassName.ANIMATION);

		if (window.innerWidth > TABLET_BREAKPOINT) {
			gsap.to(this.popupWrapper, {
				width: '50%',
				duration: 0.3,
				onComplete: () => {
					this.popupWrapper.classList.remove(ClassName.OPENED_DELIVERY);
					this.popupWrapper.classList.remove(ClassName.OPENED_PAY);
					this.popupWrapper.classList.remove(ClassName.ANIMATION);
				},
			});
		} else {
			this.popupWrapper.classList.remove(ClassName.OPENED_DELIVERY);
			this.popupWrapper.classList.remove(ClassName.OPENED_PAY);
			this.popupWrapper.classList.remove(ClassName.ANIMATION);
		}
	}
	openPay() {
		this.popupWrapper.classList.add(ClassName.ANIMATION);
		this.popupWrapper.classList.add(ClassName.OPENED_PAY);
		this.popupWrapper.classList.remove(ClassName.ANIMATION);
	}
}

export default new Cart();
