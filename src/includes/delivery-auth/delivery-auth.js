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
		this.authBtn = this.container.querySelector('[data-auth-btn]');
		this.authBlock = this.container.querySelector('[data-auth-block]');
		this.deliveryAuthChange = this.container.querySelectorAll('[data-delivery-auth-change]');

		this._onAuthButtonClick = this._onAuthButtonClick.bind(this);
		this._onCheckCodeButtonClick = this._onCheckCodeButtonClick.bind(this);
		this._onChangeUserButtonClick = this._onChangeUserButtonClick.bind(this);
		this.onAuthBtnClick = this.onAuthBtnClick.bind(this);
		this.onAuthBtnChangeClick = this.onAuthBtnChangeClick.bind(this);

		this.authButton.addEventListener('click', this._onAuthButtonClick);
		this.checkCodeButton.addEventListener('click', this._onCheckCodeButtonClick);
		this.changeUserButton.addEventListener('click', this._onChangeUserButtonClick);
		this.deliveryAuthChange.forEach(btn => {
			btn.addEventListener('click', this.onAuthBtnChangeClick);
		});
		if (this.authBtn) {
			this.authBtn.addEventListener('click', this.onAuthBtnClick);
		}
	}
	_onAuthButtonClick(evt) {
		evt.preventDefault();

		if (this.telInput.getAttribute('aria-invalid') === 'true') {
			this.telInput.focus();
		} else {
			this.setAuthFormState(FormStage.SMS);
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
	onAuthBtnClick(e) {
		e.preventDefault();
		this.authBlock.classList.toggle('_auth');
	}
	onAuthBtnChangeClick(e) {
		e.preventDefault();
		this.authBlock.classList.toggle('_email');
	}
}

export default DeliveryAuth;
