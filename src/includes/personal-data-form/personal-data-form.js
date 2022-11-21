const CLASS_ACTIVE = '_active';

class PersonalDataForm {
	constructor() {
		this.forms = document.querySelectorAll('[data-data-form]');
		this.openBtns = document.querySelectorAll('[data-data-form-open]');
		this.closeBtns = document.querySelectorAll('[data-data-form-close]');
		this.init();
	}

	init() {
		if (!this.forms.length) {
			return;
		}
		this.openBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				const formName = btn.dataset.dataFormOpen;
				const forms = document.querySelector(`[data-data-form="${formName}"]`);
				forms.classList.add(CLASS_ACTIVE);
			});
		});
		this.closeBtns.forEach(btn => {
			btn.addEventListener('click', () => {
				const formName = btn.dataset.dataFormClose;
				const forms = document.querySelector(`[data-data-form="${formName}"]`);
				forms.classList.remove(CLASS_ACTIVE);
			});
		});
	}
}

export default new PersonalDataForm();
