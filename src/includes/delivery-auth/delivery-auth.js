const FormStage = {
	DEFAULT: 'default',
	SMS: 'sms',
	USER_INFO: 'user-info',
};

class DeliveryAuth {
	constructor(container) {
		this.init(container);
	}

	init(container) {
		if (!container) {
			return;
		}

		this.container = container;
		this.authForm = this.container.querySelector('.delivery-auth__form');
		this.authButton = this.container.querySelector('.delivery-auth__submit-btn');
		this.checkCodeButton = this.container.querySelector('.delivery-auth__check-code');
		this.telInput = this.container.querySelector('.delivery-auth__input._tel input');
		this.smsInput = this.container.querySelector('.delivery-auth__input._sms input');
		this.changeUserButton = this.container.querySelector('.delivery-auth__user-change');
		this.cartRegisterContainers = document.querySelectorAll(
			'.cart-delivery__register-form._new-user'
		);

		this._onCheckCodeButtonClick = this._onCheckCodeButtonClick.bind(this);
		this._onChangeUserButtonClick = this._onChangeUserButtonClick.bind(this);

		this.authButton.addEventListener('click', this._onAuthButtonClick);
		this.checkCodeButton.addEventListener('click', this._onCheckCodeButtonClick);
		if (this.changeUserButton) {
			this.changeUserButton.addEventListener('click', this._onChangeUserButtonClick);
		}
	}
	_onCheckCodeButtonClick(evt) {
		evt.preventDefault();

		if (!this.smsInput.value) {
			this.smsInput.focus();
		} else {
			this.showUserInfo();
		}
	}
	_onChangeUserButtonClick(evt) {
		evt.preventDefault();

		this.setDefaultState();
	}
	setAuthFormState(state) {
		this.classModifier = state;
		this.container.setAttribute('data-form-stage', this.classModifier);
	}
	showUserInfo() {
		this.setAuthFormState(FormStage.USER_INFO);
		this.cartRegisterContainers.forEach(item => {
			item.parentElement.style.display = 'none';
		});
	}
	setDefaultState() {
		this.setAuthFormState(FormStage.DEFAULT);
		this.cartRegisterContainers.forEach(item => item.parentElement.removeAttribute('style'));
		this.authForm.reset();
		this.telInput.setAttribute('aria-invalid', true);
		this.telInput.closest('.delivery-auth__input').classList.remove('is-valid');
		this.telInput.closest('.delivery-auth__input').classList.remove('_filled');
	}
}

export default DeliveryAuth;
