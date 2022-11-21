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
		this.animatedBlocks = document.querySelectorAll(
			'[data-animation]:not([data-slider-animation]), [data-lottie-autoplay-trigger]'
		);

		this.lineTriggers = document.querySelectorAll('[data-animation-line-trigger]');

		if (!this.animatedBlocks.length && !this.lineTriggers.length) {
			return;
		}

		if (window.innerWidth > TABLET_BREAKPOINT) {
			document.documentElement.classList.add(ClassName.ANIMATIONS);

			this._onWindowScroll = this._onWindowScroll.bind(this);

			window.addEventListener('scroll', this._onWindowScroll);
			this._onWindowScroll();
		}
	}
	_onWindowScroll() {
		this.lineTriggers.forEach(trigger => {
			const isAnimated = trigger.classList.contains(ClassName.ANIMATED);

			if (!isAnimated) {
				const isInViewport = Utils.isElementInViewport(trigger);

				if (isInViewport) {
					trigger.closest('.history ').classList.add(ClassName.ANIMATED);
				}
			}
		});

		this.animatedBlocks.forEach(block => {
			const isAnimated = block.classList.contains(ClassName.ANIMATED);

			if (!isAnimated) {
				const isInViewport = Utils.isElementInViewport(block, 1.2);

				if (isInViewport) {
					if (block.hasAttribute('data-lottie-autoplay-trigger')) {
						const lottieBlock = block.nextElementSibling;

						lottieBlock.lottieAnimation && lottieBlock.lottieAnimation.play();
					}
					block.classList.add(ClassName.ANIMATED);
				}
			}
		});
	}
}

export default new ShowAnimations();
