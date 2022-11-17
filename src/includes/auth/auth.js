const stateClasses = {
	email: '_email',
	phone: '_phone',
	code: '_code',
	pass: '_pass',
};

class Auth {
	constructor() {
		this.authBlock = document.querySelector('[data-auth]');
		this.init();
	}

	init() {
		if (!this.authBlock) {
			return;
		}
		const emailAuthBth = this.authBlock.querySelector('[data-auth-email]');
		const phoneAuthBth = this.authBlock.querySelector('[data-auth-phone]');
		const subbmitCodeBth = this.authBlock.querySelector('[data-auth-code]');
		const forgotPassBth = this.authBlock.querySelector('[data-auth-pass]');
		emailAuthBth.addEventListener('click', () => {
			this.setState('email');
		});
		phoneAuthBth.addEventListener('click', () => {
			this.setState('phone');
		});
		subbmitCodeBth.addEventListener('click', () => {
			this.setState('code');
		});
		forgotPassBth.addEventListener('click', () => {
			this.setState('pass');
		});
		// this.clearStates();
	}

	setState(state) {
		this.clearStates();
		this.authBlock.classList.add(stateClasses[state]);
		this.authBlock.dateset.auth = state;
	}

	clearStates() {
		for (const [, value] of Object.entries(stateClasses)) {
			this.authBlock.classList.remove(value);
		}
	}
}

export default new Auth();
