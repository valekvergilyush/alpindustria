class NewCertForm {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('[data-cert-form]');

		if (!this.container) {
			return;
		}

		const fields = this.container.querySelector('[data-cert-form-fields]');
		const submitButton = this.container.querySelector('[data-cert-form-submit]');
		const editButton = this.container.querySelector('[data-cert-form-edit]');

		submitButton.addEventListener('click', evt => {
			evt.preventDefault();
			fields.scrollTo(0, 0);
			this.container.classList.remove('_edit');
			this.container.classList.add('_pay');
		});

		editButton.addEventListener('click', evt => {
			evt.preventDefault();
			fields.scrollTo(0, 0);
			this.container.classList.remove('_pay');
			this.container.classList.add('_edit');
		});
	}
}

export default new NewCertForm();
