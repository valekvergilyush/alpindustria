const ClassName = {
	ACTIVE: '_active',
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

		this.triggers.forEach(trigger => {
			trigger.addEventListener('click', evt => {
				evt.preventDefault();

				this.activeTrigger.classList.remove(ClassName.ACTIVE);

				this.activeTrigger = evt.currentTarget;
				this.activeTrigger.classList.add(ClassName.ACTIVE);
			});
		});
	}
}

export default new HeroTrails();
