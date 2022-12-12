const ClassName = {
	ACTIVE: '_active',
	PREV: '_prev',
};

class HeroTrails {
	constructor() {
		this.init();
	}

	init() {
		this.accordion = document.querySelector('[data-vaccordion]');

		if (!this.accordion) {
			return;
		}

		this.triggers = this.accordion.querySelectorAll('[data-vaccordion-item]');
		this.activeTrigger = this.accordion.querySelector('[data-vaccordion-item]._active');
		this.lastActive = this.accordion.querySelector('[data-vaccordion-item]._active');

		this.triggers.forEach(trigger => {
			trigger.addEventListener('click', evt => {
				evt.preventDefault();

				this.activeTrigger.classList.remove(ClassName.ACTIVE);
				this.lastActive.classList.remove(ClassName.PREV);

				this.lastActive = this.activeTrigger;
				this.activeTrigger = evt.currentTarget;
				this.lastActive.classList.add(ClassName.PREV);
				this.activeTrigger.classList.add(ClassName.ACTIVE);
			});
		});
	}
}

export default new HeroTrails();
