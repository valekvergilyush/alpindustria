const ClassName = {
	ACTIVE: '_active',
};

class CommunityTabs {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('[data-community-tab]');

		if (!this.container) {
			return;
		}

		this.buttons = this.container.querySelectorAll('[data-tab-btn]');
		this.sections = this.container.querySelectorAll('[data-tab-section]');
		this.activeButton = this.container.querySelector('[data-tab-btn]._active');
		this.activeSection = this.container.querySelector('[data-tab-section]._active');

		this._onButtonClick = this._onButtonClick.bind(this);

		this.buttons.forEach(button => button.addEventListener('click', this._onButtonClick));
	}
	openSection(id) {
		this.activeSection && this.activeSection.classList.remove(ClassName.ACTIVE);

		this.activeSection = this.container.querySelector(`[data-tab-section="${id}"]`);
		this.activeSection.classList.add(ClassName.ACTIVE);
	}
	_onButtonClick(evt) {
		evt.preventDefault();

		const id = evt.target.id;

		this.activeButton && this.activeButton.classList.remove(ClassName.ACTIVE);
		this.activeButton = this.container.querySelector(`#${id}`);
		this.activeButton.classList.add(ClassName.ACTIVE);

		this.openSection(id);
	}
}

export default new CommunityTabs();
