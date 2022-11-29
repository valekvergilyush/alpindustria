const CLASS_ACTIVE = '_active';

class PersonalDataForm {
	constructor() {
		this.forms = document.querySelectorAll('[data-data-form]');
		this.init();
	}

	init() {
		if (!this.forms.length) {
			return;
		}
		this.openBtns = document.querySelectorAll('[data-data-form-open]');
		this.closeBtns = document.querySelectorAll('[data-data-form-close]');
		this.forms.forEach(formBlock => {
			const form = formBlock.querySelector('form');
			form.addEventListener('submit', e => {
				e.preventDefault();
				formBlock.classList.remove(CLASS_ACTIVE);
			});
		});
		this.openBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				const formName = btn.dataset.dataFormOpen;
				const form = document.querySelector(`[data-data-form="${formName}"]`);
				if (form) {
					form.classList.add(CLASS_ACTIVE);
				}
			});
		});
		this.closeBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				const formName = btn.dataset.dataFormClose;
				const form = document.querySelector(`[data-data-form="${formName}"]`);
				if (form) {
					form.classList.remove(CLASS_ACTIVE);
				}
			});
		});
	}
}

export default new PersonalDataForm();
