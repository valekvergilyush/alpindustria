import env from '../../assets/js/utils/env';
import Popups from '../../assets/js/modules/Popups';
import DeliveryAuth from '../delivery-auth/delivery-auth';
import { showInputsError } from '../../assets/js/classes/form-validate';

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
		this.popup = this.popupWrapper.querySelector('[data-popup="cart"]');
		this.cart = this.popup.querySelector('.cart');
		this.deliveryOpener = this.container.querySelector('[data-cart-delivery-opener]');
		this.backButtons = this.container.querySelectorAll('[data-cart-back]');
		this.payButton = this.container.querySelector('[data-cart-pay]');
		this.shopButton = this.container.querySelector('[data-cart-shop]');
		this.rentButton = this.container.querySelector('[data-cart-rent]');
		this.rentSubmitButton = this.container.querySelector('[data-cart-rent-submit]');
		this.legalBlock = this.container.querySelector('[data-legal-block]');
		this.legalCheckboxes = this.container.querySelectorAll('[data-legal-checkbox]');

		this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
		this.onBackButtonClick = this.onBackButtonClick.bind(this);
		this.onPayButtonClick = this.onPayButtonClick.bind(this);
		this.onShopButtonClick = this.onShopButtonClick.bind(this);
		this.onRentButtonClick = this.onRentButtonClick.bind(this);
		this.onRentSubmitButtonClick = this.onRentSubmitButtonClick.bind(this);
		this.onLegalCheckboxChange = this.onLegalCheckboxChange.bind(this);

		this.deliveryOpener.addEventListener('click', this.onSubmitButtonClick);
		this.payButton.addEventListener('click', this.onPayButtonClick);
		this.backButtons.forEach(button => button.addEventListener('click', this.onBackButtonClick));
		this.shopButton.addEventListener('click', this.onShopButtonClick);
		this.rentButton.addEventListener('click', this.onRentButtonClick);
		// this.rentSubmitButton.addEventListener('click', this.onRentSubmitButtonClick);
		this.legalCheckboxes.forEach(checkbox => {
			checkbox.addEventListener('change', this.onLegalCheckboxChange);
		});
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

		if (this.cart.classList.contains('_shop')) {
			const registerForm = this.cart.querySelector(
				'.cart__delivery-content._shop .cart-delivery__register-form'
			);
			const registerFormInputs = registerForm.querySelectorAll('[data-validate-type] input');
			showInputsError(registerFormInputs);

			const deliveryForm = this.cart.querySelector(
				'.delivery-address__section._courier:not(._hidden)'
			);

			if (deliveryForm) {
				const deliveryFormInputs = deliveryForm.querySelectorAll('[data-validate-type] input');
				showInputsError(deliveryFormInputs);
			}

			const registerFormInvalidInput = registerForm.querySelector(
				'[data-validate-type].is-invalid'
			);

			let deliveryFormInvalidInput;

			if (deliveryForm) {
				deliveryFormInvalidInput = deliveryForm.querySelector('[data-validate-type].is-invalid');
			}

			if (registerFormInvalidInput) {
				registerFormInvalidInput && registerFormInvalidInput.querySelector('input').focus();
			} else if (deliveryFormInvalidInput) {
				deliveryFormInvalidInput && deliveryFormInvalidInput.querySelector('input').focus();
			} else {
				this.openPay();
			}
		}
	}
	onRentSubmitButtonClick(evt) {
		evt.preventDefault();

		if (this.cart.classList.contains('_rent')) {
			const registerForm = this.cart.querySelector(
				'.cart__delivery-content._rent .cart-delivery__register-form'
			);
			const registerFormInputs = registerForm.querySelectorAll('[data-validate-type] input');
			showInputsError(registerFormInputs);

			const registerFormInvalidInput = registerForm.querySelector(
				'[data-validate-type].is-invalid'
			);

			if (registerFormInvalidInput) {
				registerFormInvalidInput && registerFormInvalidInput.querySelector('input').focus();
			} else {
				Popups.open('cart-reservation');
			}
		}
	}
	onShopButtonClick() {
		this.container.classList.remove('_rent');
		this.container.classList.add('_shop');
	}
	onRentButtonClick() {
		this.container.classList.remove('_shop');
		this.container.classList.add('_rent');
	}
	openDelivery() {
		this.popup.scrollTo(0, 0);
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
			const authContainers = document.querySelectorAll('[data-delivery-auth]');
			authContainers.forEach(container => new DeliveryAuth(container));
		}

		if (env.isIOS) {
			document.body.style.overflow = '';
		}
	}
	openDefault() {
		this.popup.scrollTo(0, 0);
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

		if (env.isIOS) {
			document.body.style.overflow = '';
		}
	}
	openPay() {
		this.popup.scrollTo(0, 0);
		this.popupWrapper.classList.add(ClassName.ANIMATION);
		this.popupWrapper.classList.add(ClassName.OPENED_PAY);

		clearTimeout(this.animTO);
		this.animTO = setTimeout(() => this.popupWrapper.classList.remove(ClassName.ANIMATION), 300);

		if (env.isIOS) {
			document.body.style.overflow = 'hidden';
		}
	}
	onLegalCheckboxChange(e) {
		const legalBlock = e.target.parentNode.parentNode.querySelector('[data-legal-block]');
		if (legalBlock) {
			legalBlock.classList.toggle(ClassName.HIDDEN);
		}
	}
}

export default new Cart();
