class UserForm {
	constructor(el) {
		this.init(el);
	}

	init(el) {
		this.container = el;

		if (!this.container) {
			return;
		}

		const toggles = this.container.querySelectorAll('[data-user-form-toggle]');

		toggles.forEach(toggle => {
			toggle.addEventListener('click', () => {
				this.container.setAttribute('data-user-form', toggle.getAttribute('data-user-form-toggle'));
			});
		});
	}
}

document.querySelectorAll('[data-user-form]').forEach(el => new UserForm(el));

export default UserForm;
