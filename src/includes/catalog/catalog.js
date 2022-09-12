const ACTIVE_CLASS = '_active';

class Catalog {
	constructor() {
		this.init();
	}

	init() {
		this.layoutControls = document.querySelector('.filters__layout-buttons');
		this.catalogList = document.querySelector('.catalog__list');

		if (!this.layoutControls && !this.catalogList) {
			return;
		}

		this.layoutClassName = '_cols-4';

		this.layoutControls.addEventListener('click', evt => {
			evt.preventDefault();

			const value = evt.target.getAttribute('data-cols');

			if (value) {
				this.layoutControls.querySelector(`.${ACTIVE_CLASS}`).classList.remove(ACTIVE_CLASS);
				evt.target.classList.add(ACTIVE_CLASS);
				this.layoutClassName && this.catalogList.classList.remove(this.layoutClassName);
				this.layoutClassName = `_cols-${value}`;
				this.catalogList.classList.add(this.layoutClassName);
			}
		});
	}
}
export default new Catalog();
