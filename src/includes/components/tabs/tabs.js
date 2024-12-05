class Tabs {
	constructor(el, selectedIndex = 0) {
		if (!el) {
			return;
		}

		this.el = el;
		this.tabTriggers = this.el.querySelectorAll('[data-tab-trigger]');
		this.tabPanels = this.el.querySelectorAll('[data-tab-panel]');

		if (this.tabTriggers.length === 0 || this.tabTriggers.length !== this.tabPanels.length) {
			return;
		}

		this.init(selectedIndex);
	}

	init(selectedIndex) {
		this.tabTriggersLength = this.tabTriggers.length;
		this.selectedTab = 0;
		this.prevSelectedTab = null;
		this.clickListener = this._clickEvent.bind(this);
		this.keydownListener = this._keydownEvent.bind(this);
		this.keys = {
			prev: 37,
			next: 39,
		};

		for (let i = 0; i < this.tabTriggersLength; i++) {
			this.tabTriggers[i].index = i;
			this.tabTriggers[i].addEventListener('click', this.clickListener, false);
			this.tabTriggers[i].addEventListener('keydown', this.keydownListener, false);

			if (this.tabTriggers[i].classList.contains('_selected')) {
				this.selectedTab = i;
			}
		}

		if (!Number.isNaN(selectedIndex)) {
			this.selectedTab =
				selectedIndex < this.tabTriggersLength ? selectedIndex : this.tabTriggersLength - 1;
		}

		this.selectTab(this.selectedTab);
		this.el.classList.add('is-initialized');
	}
	_clickEvent(e) {
		e.preventDefault();

		if (e.currentTarget.index === this.selectedTab) {
			return;
		}
		this.selectTab(e.currentTarget.index, true);
	}
	_keydownEvent(e) {
		let targetIndex;

		if (e.keyCode === this.keys.prev || e.keyCode === this.keys.next) {
			e.preventDefault();
		} else {
			return;
		}

		if (e.keyCode === this.keys.prev && e.currentTarget.index > 0) {
			targetIndex = e.currentTarget.index - 1;
		} else if (e.keyCode === this.keys.next && e.currentTarget.index < this.tabTriggersLength - 1) {
			targetIndex = e.currentTarget.index + 1;
		} else {
			return;
		}

		this.selectTab(targetIndex, true);
	}
	_show(index, userInvoked) {
		this.tabTriggers[index].classList.add('_selected');
		this.tabTriggers[index].setAttribute('aria-selected', true);
		this.tabTriggers[index].setAttribute('tabindex', 0);

		this.tabPanels[index].classList.remove('_hidden');
		this.tabPanels[index].setAttribute('aria-hidden', false);
		this.tabPanels[index].setAttribute('tabindex', 0);

		if (userInvoked) {
			this.tabTriggers[index].focus();
		}
	}
	_hide(index) {
		this.tabTriggers[index].classList.remove('_selected');
		this.tabTriggers[index].setAttribute('aria-selected', false);
		this.tabTriggers[index].setAttribute('tabindex', -1);

		this.tabPanels[index].classList.add('_hidden');
		this.tabPanels[index].setAttribute('aria-hidden', true);
		this.tabPanels[index].setAttribute('tabindex', -1);
	}
	selectTab(index, userInvoked) {
		if (this.prevSelectedTab === null) {
			for (let i = 0; i < this.tabTriggersLength; i++) {
				if (i !== index) {
					this._hide(i);
				}
			}
		} else {
			this._hide(this.selectedTab);
		}

		this.prevSelectedTab = this.selectedTab;
		this.selectedTab = index;

		this._show(this.selectedTab, userInvoked);
	}
	destroy() {
		for (let i = 0; i < this.tabTriggersLength; i++) {
			this.tabTriggers[i].classList.remove('_selected');
			this.tabTriggers[i].removeAttribute('aria-selected');
			this.tabTriggers[i].removeAttribute('tabindex');

			this.tabPanels[i].classList.remove('_hidden');
			this.tabPanels[i].removeAttribute('aria-hidden');
			this.tabPanels[i].removeAttribute('tabindex');

			this.tabTriggers[i].removeEventListener('click', this.clickListener, false);
			this.tabTriggers[i].removeEventListener('keydown', this.keydownListener, false);

			delete this.tabTriggers[i].index;
		}

		this.el.classList.remove('is-initialized');
	}
}

export default Tabs;
