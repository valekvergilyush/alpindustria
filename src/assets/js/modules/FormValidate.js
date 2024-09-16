import DeliveryAddress from '../../../includes/delivery-address/delivery-address';
import DiscountCard from '../../../includes/discount-card/discount-card';
import FormsValidate from '../classes/form-validate';
const formWrappers = document.querySelectorAll('[data-validate]');

class FormValidate {
	constructor() {
		this.form = document.querySelector('[data-wishlist-form]');
		this.opener = document.querySelector('[data-wishlist-show]');
		this.cancelBtn = document.querySelector('[data-wishlist-cancel]');
		this.input = document.querySelector('[data-wishlist-input]');
		this.hideClass = '_hide';
		this.callbacks = {
			base: {
				validationSuccessCallback: this.baseValidationSuccessCallback,
				validationErrorCallback: this.baseValidationErrorCallback,
			},
			'card-popup': {
				validationSuccessCallback: this.cardPopupValidationSuccessCallback,
				validationErrorCallback: this.baseValidationErrorCallback,
			},
			'cart-discount-phone': {
				validationSuccessCallback: this.cartDiscountPhoneValidationSuccessCallback,
				validationErrorCallback: this.baseValidationErrorCallback,
			},
			'save-address': {
				validationSuccessCallback: this.saveAddressValidationSuccessCallback,
				validationErrorCallback: this.baseValidationErrorCallback,
			},
			'add-card-form': {
				validationSuccessCallback: this.addCardFormValidationSuccessCallback,
				validationErrorCallback: this.baseValidationErrorCallback,
			},
		};
		this.init();
	}
	init() {
		if (formWrappers.length) {
			formWrappers.forEach(wrapper => {
				let callback = wrapper.dataset.callback;
				if (!callback) {
					callback = 'base';
				}
				const formValidate = new FormsValidate(wrapper, this.callbacks[callback]);
				return formValidate.init();
			});
		}
	}
	resetForm(form) {
		setTimeout(() => {
			window.clearForm(form);
		}, 1000);
	}
	baseValidationErrorCallback = e => {
		e.preventDefault();

		e.target.querySelector('[aria-invalid="true"]').focus();
	};
	baseValidationSuccessCallback = e => {
		e.preventDefault();
		this.resetForm(e.target);
	};
	cardPopupValidationSuccessCallback = e => {
		e.preventDefault();
		const container = e.target.closest('.create-card-popup');
		container.classList.add('_anim');
		setTimeout(() => {
			container.classList.remove('_anim');
			container.classList.add('_success');
		}, 5000);
		this.resetForm(e.target);
	};
	cartDiscountPhoneValidationSuccessCallback = e => {
		e.preventDefault();
		const container = e.target.closest('.cart-discount');
		container.instance.addCard();
		this.resetForm(e.target);
	};
	saveAddressValidationSuccessCallback = e => {
		e.preventDefault();

		DeliveryAddress.container.classList.remove('_edit');
		this.resetForm(e.target);
	};
	addCardFormValidationSuccessCallback = e => {
		e.preventDefault();

		DiscountCard.addCardFormContainer.classList.add('_sms');
		this.resetForm(e.target);
	};
}

export default new FormValidate();
