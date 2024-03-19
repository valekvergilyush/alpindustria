const ClassName = {
	SUCCESS: '_success',
	FILLED: '_filled',
};

class SubscribeForm {
	constructor() {
		this.init();
	}

	init() {
		this.form = document.querySelector('.footer__subscribe');

		if (!this.form) {
			return;
		}

		this.submitButton = this.form.querySelector('.subscribe-form__submit');
		this.closeButton = this.form.querySelector('.subscribe-form__close');
		this.input = this.form.querySelector('.subscribe-form__input');

		this.form.addEventListener('submit', evt => {
			evt.preventDefault();

			this.form.classList.add(ClassName.SUCCESS);
		});
		this.closeButton.addEventListener('click', evt => {
			evt.preventDefault();

			this.form.reset();
			this.input.classList.remove(ClassName.FILLED);
			this.form.classList.remove(ClassName.SUCCESS);
		});
	}
}

export default new SubscribeForm();
