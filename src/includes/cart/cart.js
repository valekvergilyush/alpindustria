const ClassName = {
	OPENED_DELIVERY: '_opened-delivery',
	HIDDEN: 'hidden',
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
		this.popupCloseButton = this.popupWrapper.querySelector('.popups__close-button');
		this.deliveryOpener = this.container.querySelector('[data-cart-delivery-opener]');
		this.cartProductsContainer = this.container.querySelector('[data-cart-products]');
		this.cartListSection = this.container.querySelector('[data-cart-list]');
		this.deliverySection = this.container.querySelector('[data-cart-delivery]');
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
		console.log(123);
		evt.preventDefault();

		this.back();
	}
	openDelivery() {
		gsap.to([this.cartProductsContainer, this.popupCloseButton], {
			opacity: 0,
			duration: 0.15,
			onComplete: () => {
				gsap.to(this.popupWrapper, {
					width: '100%',
					duration: 0.3,
					onComplete: () => {
						this.container.classList.add(ClassName.OPENED_DELIVERY);
						this.cartProductsContainer.classList.add(ClassName.HIDDEN);
						this.cartListSection.classList.remove(ClassName.HIDDEN);
						this.deliverySection.classList.remove(ClassName.HIDDEN);
					},
				});
				gsap.to(this.backButton, {
					opacity: 1,
					display: 'inline-flex',
					duration: 0.3,
				});
			},
		});
	}
	back() {
		this.container.classList.remove(ClassName.OPENED_DELIVERY);
		this.cartProductsContainer.classList.remove(ClassName.HIDDEN);
		this.cartListSection.classList.add(ClassName.HIDDEN);
		this.deliverySection.classList.add(ClassName.HIDDEN);
		gsap.to(this.backButton, {
			opacity: 0,
			display: 'none',
			duration: 0.3,
		});
		gsap.to(this.popupWrapper, {
			width: '50%',
			duration: 0.3,
			onComplete: () => {
				gsap.to([this.cartProductsContainer, this.popupCloseButton], {
					opacity: 1,
					duration: 0.15,
				});
			},
		});
	}
}

export default new Cart();
