const FormStage = {
	DEFAULT: 'default',
	SMS: 'sms',
	USER_INFO: 'user-info',
};

class DeliveryAuth {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('[data-delivery-auth]');
		this.authButton = this.container.querySelector('.delivery-auth__submit-btn');
		this.checkCodeButton = this.container.querySelector('.delivery-auth__check-code');
		this.telInput = this.container.querySelector('#delivery-auth-tel');
		this.smsInput = this.container.querySelector('#delivery-auth-sms');

		this._onAuthButtonClick = this._onAuthButtonClick.bind(this);
		this._onCheckCodeButtonClick = this._onCheckCodeButtonClick.bind(this);

		this.authButton.addEventListener('click', this._onAuthButtonClick);
		this.checkCodeButton.addEventListener('click', this._onCheckCodeButtonClick);
	}
	_onAuthButtonClick(evt) {
		evt.preventDefault();

		if (this.telInput.getAttribute('aria-invalid') === 'true') {
			this.telInput.focus();
		} else {
			this.classModifier = FormStage.SMS;
			this.container.setAttribute('data-form-stage', this.classModifier);
		}
	}
	_onCheckCodeButtonClick(evt) {
		evt.preventDefault();

		if (!this.smsInput.value) {
			this.smsInput.focus();
		} else {
			this.classModifier = FormStage.USER_INFO;
			this.container.setAttribute('data-form-stage', this.classModifier);
		}
	}
}

export default new DeliveryAuth();
