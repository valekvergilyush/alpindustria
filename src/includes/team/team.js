const ClassName = {
	ACTIVE: '_active',
};

const MOBILE_BREAKPOINT = 640;

class Team {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('[data-team-list]');

		if (!this.container) {
			return;
		}

		this.prevWindowWidth = window.innerWidth;

		this.onListClick = this.onListClick.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);

		this.container.addEventListener('click', this.onListClick);
		window.addEventListener('resize', this.onWindowResize);

		this.onWindowResize();
	}
	onListClick(evt) {
		const listItem = evt.target.closest('[data-team-item]');

		if (listItem) {
			evt.preventDefault();

			if (listItem.classList.contains(ClassName.ACTIVE)) {
				this.closeItem(listItem);
			} else {
				this.openItem(listItem);
			}
		}
	}
	openItem(item) {
		if (window.innerWidth > MOBILE_BREAKPOINT) {
			this.activeItem && this.activeItem.classList.remove(ClassName.ACTIVE);
		}
		this.activeItem = item;
		this.activeItem.classList.add(ClassName.ACTIVE);
	}
	closeItem(item) {
		item.classList.remove(ClassName.ACTIVE);
		this.activeItem = null;
	}
	onWindowResize() {
		if (window.innerWidth > MOBILE_BREAKPOINT) {
			const activeItems = this.container.querySelectorAll(`[data-team-item].${ClassName.ACTIVE}`);

			activeItems.length > 1 &&
				activeItems.forEach(item => {
					this.closeItem(item);
				});
		}
	}
}

export default new Team();
