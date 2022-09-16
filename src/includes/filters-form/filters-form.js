const ClassName = {
	OPENED: '_opened',
};

class FiltersForm {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.page__filters-form');

		if (!this.container) {
			return;
		}

		this.subContainers = this.container.querySelectorAll('[data-subcategory]');

		this.subContainers.forEach(subContainer => {
			subContainer.querySelectorAll('[data-subcategory-item]').forEach(item => {
				const button = item.querySelector('.filters-form__button');
				const backButton = item.querySelector('.filters-form__button._back');

				button.addEventListener('click', evt => {
					evt.preventDefault();

					this.openSubcategory(subContainer, item);
				});

				backButton.addEventListener('click', evt => {
					evt.preventDefault();

					this.closeSubcategory(subContainer, item);
				});
			});
		});
	}
	openSubcategory(container, item) {
		container.classList.add(ClassName.OPENED);
		item.classList.add(ClassName.OPENED);
	}
	closeSubcategory(container, item) {
		container.classList.remove(ClassName.OPENED);
		item.classList.remove(ClassName.OPENED);
	}
}

export default new FiltersForm();
