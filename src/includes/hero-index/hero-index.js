const ClassName = {
	ACTIVE: '_active',
};

class HeroIndex {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.hero-index');

		if (!this.container) {
			return;
		}

		this.heroBgImages = this.container.querySelectorAll('[data-hero-bg]');
		this.heroLinks = this.container.querySelectorAll('[data-hero-link]');
		this.activeBg = this.container.querySelector('[data-hero-bg]._active');

		this.heroLinks.forEach(link => {
			link.addEventListener('mouseenter', () => {
				const linkId = link.getAttribute('data-hero-link');
				const linkBgElement = this.container.querySelector(`[data-hero-bg="${linkId}"]`);

				this.activeBg.classList.remove(ClassName.ACTIVE);
				this.activeBg = linkBgElement;
				this.activeBg.classList.add(ClassName.ACTIVE);
			});
		});
	}
}

export default new HeroIndex();
