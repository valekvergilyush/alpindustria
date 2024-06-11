const ClassName = {
	EDIT: '_edit',
};

class TitleBlock {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('[data-title-block]');

		if (!this.container) {
			return;
		}

		this.titleContainer = this.container.querySelector('.title-block__wrap');
		this.formContainer = this.container.querySelector('.title-block__form-wrap');
		this.editButton = this.container.querySelector('.title-block__link._edit');

		if (!this.editButton) {
			return;
		}

		this.formInput = this.formContainer.querySelector('input');
		this.formClose = this.formContainer.querySelector('[data-wishlist-cancel]');

		this.editButton.addEventListener('click', evt => {
			evt.preventDefault();

			this.container.classList.add(ClassName.EDIT);
			this.formInput.focus();
		});

		this.formClose.addEventListener('click', evt => {
			evt.preventDefault();

			this.formInput.value = '';
			this.container.classList.remove(ClassName.EDIT);
		});
	}
}

export default new TitleBlock();
