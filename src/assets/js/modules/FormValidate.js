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
	};
	baseValidationSuccessCallback = e => {
		e.preventDefault();
		this.resetForm(e.target);
	};
}

export default new FormValidate();
