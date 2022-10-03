const ClassName = {
	OPENED_DELIVERY: '_opened-delivery',
	HIDDEN: 'hidden',
	ANIMATION: '_animation',
};

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
		this.backButton = this.container.querySelector('[data-cart-back]');

		this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
		this.onBackButtonClick = this.onBackButtonClick.bind(this);

		this.deliveryOpener.addEventListener('click', this.onSubmitButtonClick);
		this.backButton.addEventListener('click', this.onBackButtonClick);
	}
	onSubmitButtonClick(evt) {
		evt.preventDefault();

		this.openDelivery();
	}
	onBackButtonClick(evt) {
		evt.preventDefault();

		this.openDefault();
	}
	openDelivery() {
		this.popupWrapper.classList.add(ClassName.ANIMATION);
		gsap.to(this.popupWrapper, {
			width: '100%',
			duration: 0.3,
			onComplete: () => {
				this.popupWrapper.classList.remove(ClassName.ANIMATION);
				this.popupWrapper.classList.add(ClassName.OPENED_DELIVERY);
			},
		});
	}
	openDefault() {
		this.popupWrapper.classList.add(ClassName.ANIMATION);
		gsap.to(this.popupWrapper, {
			width: '50%',
			duration: 0.3,
			onComplete: () => {
				this.popupWrapper.classList.remove(ClassName.OPENED_DELIVERY);
				this.popupWrapper.classList.remove(ClassName.ANIMATION);
			},
		});
		this.popupWrapper.classList.add(ClassName.ANIMATION);
	}
}

export default new Cart();
