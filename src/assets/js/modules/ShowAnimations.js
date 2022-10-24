import Utils from '../utils/utils';

const ClassName = {
	ANIMATIONS: 'animations',
	ANIMATED: 'is-animated',
};

const TABLET_BREAKPOINT = 768;

class ShowAnimations {
	constructor() {
		this.init();
	}

	init() {
		this.animatedBlocks = document.querySelectorAll('[data-animation]');

		if (!this.animatedBlocks.length) {
			return;
		}

		if (window.innerWidth > TABLET_BREAKPOINT) {
			document.documentElement.classList.add(ClassName.ANIMATIONS);

			window.addEventListener('scroll', () => {
				this.animatedBlocks.forEach(block => {
					const isAnimated = block.classList.contains(ClassName.ANIMATED);
					if (!isAnimated) {
						const isInViewport = Utils.isElementInViewport(block, 1.2);

						isInViewport && block.classList.add(ClassName.ANIMATED);
					}
				});
			});
		}
	}
}

export default new ShowAnimations();
