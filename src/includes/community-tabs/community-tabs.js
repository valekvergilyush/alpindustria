const ClassName = {
	ACTIVE: '_active',
	MOBILE: '_mobile',
};

const TABLET_BREAKPOINT = 992;
const SECTIONS_WITHOUT_MOBILE = ['delivery'];

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
		this.containerName = this.container.dataset.communityTab;
		this.mobileMode = !SECTIONS_WITHOUT_MOBILE.includes(this.containerName);

		this.mqTablet = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT}px)`);

		this._onButtonClick = this._onButtonClick.bind(this);

		const onWindowWidthChange = evt => {
			if (evt.matches && this.mobileMode) {
				this._initMobileTabs();
			} else {
				this._initDesktopTabs();
			}
		};

		this.mqTablet.addEventListener('change', onWindowWidthChange);
		onWindowWidthChange(this.mqTablet);

		this.buttons.forEach(button => button.addEventListener('click', this._onButtonClick));
	}
	openSection(id) {
		this.activeSection && this._closeActiveSection();

		if (this.activeButton) {
			this.activeButton.classList.remove(ClassName.ACTIVE);
			this.activeButton.parentElement.classList.remove(ClassName.ACTIVE);
		}

		this.activeButton = this.container.querySelector(`#${id}`);
		this.activeButton.classList.add(ClassName.ACTIVE);
		this.activeButton.parentElement.classList.add(ClassName.ACTIVE);

		this.container.classList.add(ClassName.ACTIVE);
		this.activeSection = this.container.querySelector(`[data-tab-section="${id}"]`);
		this.activeSection.classList.add(ClassName.ACTIVE);
	}
	_closeActiveSection() {
		this.container.classList.remove(ClassName.ACTIVE);
		this.activeSection.classList.remove(ClassName.ACTIVE);

		this.activeButton.classList.remove(ClassName.ACTIVE);
		this.activeButton.parentElement.classList.remove(ClassName.ACTIVE);
	}
	_onButtonClick(evt) {
		evt.preventDefault();

		const id = evt.target.id;

		if (window.innerWidth < TABLET_BREAKPOINT && this.mobileMode) {
			if (this.container.classList.contains(ClassName.ACTIVE)) {
				this._closeActiveSection();
			} else {
				this.openSection(id);
			}
		} else {
			this.openSection(id);
		}
	}
	_initMobileTabs() {
		this.container.classList.add(ClassName.MOBILE);
		this._closeActiveSection();
	}
	_initDesktopTabs() {
		this.container.classList.remove(ClassName.MOBILE);

		if (this.activeButton) {
			this.openSection(this.activeButton.id);
		} else {
			this.openSection(this.buttons[0].id);
		}
	}
}

export default new CommunityTabs();
