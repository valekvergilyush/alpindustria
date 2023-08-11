import env from '../../assets/js/utils/env';
import Popups from '../../assets/js/modules/Popups';
import DeliveryAuth from '../delivery-auth/delivery-auth';
import { showInputsError } from '../../assets/js/classes/form-validate';

const ClassName = {
	OPENED_DELIVERY: '_opened-delivery',
	OPENED_PAY: '_opened-pay',
	HIDDEN: 'hidden',
	ANIMATION: '_animation',
	PROFILE: '_profile',
	AUTH: '_auth',
	EDIT: '_edit',
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
		this.authBtns = this.container.querySelectorAll('[data-auth-btn]');
		this.editProfileDataBtns = this.container.querySelectorAll('[data-edit-profile-data]');
		this.authBlock = this.container.querySelector('[data-auth-block]');
		this.deliveryAuthChange = this.container.querySelectorAll('[data-delivery-auth-change]');
		// this.submitAuthBtns = this.container.querySelectorAll('[data-submit-auth]');

		this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
		this.onBackButtonClick = this.onBackButtonClick.bind(this);
		this.onPayButtonClick = this.onPayButtonClick.bind(this);
		this.onShopButtonClick = this.onShopButtonClick.bind(this);
		this.onRentButtonClick = this.onRentButtonClick.bind(this);
		this.onRentSubmitButtonClick = this.onRentSubmitButtonClick.bind(this);
		this.onLegalCheckboxChange = this.onLegalCheckboxChange.bind(this);
		this.onAuthBtnClick = this.onAuthBtnClick.bind(this);
		this.onAuthBtnChangeClick = this.onAuthBtnChangeClick.bind(this);
		this.onEditProfileDataBtnClick = this.onEditProfileDataBtnClick.bind(this);
		this.onSubmitAuthBtnClick = this.onSubmitAuthBtnClick.bind(this);

		this.deliveryOpener.addEventListener('click', this.onSubmitButtonClick);
		this.payButton.addEventListener('click', this.onPayButtonClick);
		this.backButtons.forEach(button => button.addEventListener('click', this.onBackButtonClick));
		this.shopButton.addEventListener('click', this.onShopButtonClick);
		this.rentButton.addEventListener('click', this.onRentButtonClick);
		// this.rentSubmitButton.addEventListener('click', this.onRentSubmitButtonClick);
		this.legalCheckboxes.forEach(checkbox => {
			checkbox.addEventListener('change', this.onLegalCheckboxChange);
		});
		this.deliveryAuthChange.forEach(btn => {
			btn.addEventListener('click', this.onAuthBtnChangeClick);
		});
		this.authBtns.forEach(btn => {
			btn.addEventListener('click', this.onAuthBtnClick);
		});
		this.editProfileDataBtns.forEach(btn => {
			btn.addEventListener('click', this.onEditProfileDataBtnClick);
		});
		// this.submitAuthBtns.forEach(btn => {
		// 	btn.addEventListener('click', this.onSubmitAuthBtnClick);
		// });
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
	}
	openPay() {
		this.popup.scrollTo(0, 0);
		this.popupWrapper.classList.add(ClassName.ANIMATION);
		this.popupWrapper.classList.add(ClassName.OPENED_PAY);

		clearTimeout(this.animTO);
		this.animTO = setTimeout(() => this.popupWrapper.classList.remove(ClassName.ANIMATION), 300);
	}
	onLegalCheckboxChange(e) {
		const legalBlock = e.target.parentNode.parentNode.querySelector('[data-legal-block]');
		if (legalBlock) {
			legalBlock.classList.toggle(ClassName.HIDDEN);
		}
	}
	onAuthBtnClick(e) {
		e.preventDefault();
		this.authBlock.classList.remove('_profile');
		this.authBlock.classList.remove('_edit');
		this.authBlock.classList.add('_auth');
	}
	onAuthBtnChangeClick(e) {
		e.preventDefault();
		this.authBlock.classList.toggle('_email');
	}
	onEditProfileDataBtnClick(e) {
		e.preventDefault();
		this.authBlock.classList.remove(ClassName.PROFILE);
		this.authBlock.classList.remove(ClassName.AUTH);
		this.authBlock.classList.add(ClassName.EDIT);
	}
	onSubmitAuthBtnClick(e) {
		e.preventDefault();
		this.authBlock.classList.remove(ClassName.EDIT);
		this.authBlock.classList.remove(ClassName.AUTH);
		this.authBlock.classList.add(ClassName.PROFILE);
	}
}

export default new Cart();
