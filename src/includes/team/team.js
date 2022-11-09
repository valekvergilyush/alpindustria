const ClassName = {
	ACTIVE: '_active',
};

class Team {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('[data-team-list]');

		if (!this.container) {
			return;
		}

		this.onListClick = this.onListClick.bind(this);

		this.container.addEventListener('click', this.onListClick);
	}
	onListClick(evt) {
		const listItem = evt.target.closest('[data-team-item]');

		if (listItem) {
			evt.preventDefault();

			if (this.activeItem === listItem) {
				this.closeItem();
			} else {
				this.openItem(listItem);
			}
		}
	}
	openItem(item) {
		this.activeItem && this.activeItem.classList.remove(ClassName.ACTIVE);
		this.activeItem = item;
		this.activeItem.classList.add(ClassName.ACTIVE);
	}
	closeItem() {
		this.activeItem.classList.remove(ClassName.ACTIVE);
		this.activeItem = null;
	}
}

export default new Team();
