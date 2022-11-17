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
		const emailAuthBtn = this.authBlock.querySelector('[data-auth-email]');
		const phoneAuthBtn = this.authBlock.querySelector('[data-auth-phone]');
		const subbmitCodeBtn = this.authBlock.querySelector('[data-auth-code]');
		const forgotPassBtn = this.authBlock.querySelector('[data-auth-pass]');
		emailAuthBtn.addEventListener('click', () => {
			this.setState('email');
		});
		phoneAuthBtn.addEventListener('click', () => {
			this.setState('phone');
		});
		subbmitCodeBtn.addEventListener('click', () => {
			this.setState('code');
		});
		forgotPassBtn.addEventListener('click', () => {
			this.setState('pass');
		});
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
