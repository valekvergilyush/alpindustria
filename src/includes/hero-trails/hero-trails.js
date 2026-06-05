const ClassName = {
	ACTIVE: '_active',
	PREV: '_prev',
};
const AUTOPLAY_DELAY = 5000;

class HeroTrails {
	constructor() {
		this.init();
	}

	switchSlide(nextTrigger) {
		if (!nextTrigger || nextTrigger === this.activeTrigger) {
			return;
		}

		this.activeTrigger.classList.remove(ClassName.ACTIVE);
		this.lastActive = this.activeTrigger;
		this.activeTrigger = nextTrigger;
		this.lastActive.classList.add(ClassName.PREV);
		this.activeTrigger.classList.add(ClassName.ACTIVE);

		clearTimeout(this.TO);
		this.TO = setTimeout(() => this.lastActive.classList.remove(ClassName.PREV), 650);
	}

	switchToNextSlide() {
		const activeIndex = Array.from(this.triggers).indexOf(this.activeTrigger);
		const nextIndex = (activeIndex + 1) % this.triggers.length;

		this.switchSlide(this.triggers[nextIndex]);
	}

	startAutoplay() {
		if (!this.autoplayEnabled || this.triggers.length < 2) {
			return;
		}

		clearInterval(this.autoplayInterval);
		this.autoplayInterval = setInterval(() => this.switchToNextSlide(), this.autoplayDelay);
	}

	init() {
		this.accordion = document.querySelector('[data-vaccordion]');

		if (!this.accordion) {
			return;
		}

		this.triggers = this.accordion.querySelectorAll('[data-vaccordion-item]');
		this.activeTrigger = this.accordion.querySelector('[data-vaccordion-item]._active');
		this.lastActive = this.accordion.querySelector('[data-vaccordion-item]._active');
		this.autoplayEnabled = this.accordion.hasAttribute('data-autoplay');

		const autoplaySpeed = Number.parseInt(this.accordion.dataset.autoplaySpeed, 10);
		this.autoplayDelay = autoplaySpeed > 0 ? autoplaySpeed : AUTOPLAY_DELAY;

		if (!this.activeTrigger && this.triggers.length) {
			this.activeTrigger = this.triggers[0];
			this.lastActive = this.triggers[0];
			this.activeTrigger.classList.add(ClassName.ACTIVE);
		}

		this.triggers.forEach(trigger => {
			trigger.addEventListener('click', evt => {
				if (evt.currentTarget === this.activeTrigger) {
					return;
				}

				evt.preventDefault();
				this.switchSlide(evt.currentTarget);
				this.startAutoplay();
			});
		});

		this.startAutoplay();
	}
}

export default new HeroTrails();
