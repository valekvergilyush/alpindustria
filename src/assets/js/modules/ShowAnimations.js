import Utils from '../utils/utils';
import env from '../utils/env';

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

		this.animatedLines = document.querySelectorAll('[data-animation-line]');

		if (!this.animatedBlocks.length && !this.animatedLines.length) {
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
		this.animatedLines.forEach(line => {
			const isAnimated = line.classList.contains(ClassName.ANIMATED);
			if (!isAnimated) {
				const isInViewport = Utils.isElementInViewport(line);

				if (isInViewport) {
					line.classList.add(ClassName.ANIMATED);
				}
			}
		});

		this.animatedBlocks.forEach(block => {
			const isAnimated = block.classList.contains(ClassName.ANIMATED);
			if (!isAnimated) {
				const isInViewport = Utils.isElementInViewport(block, 1.2);

				if (isInViewport) {
					if (block.hasAttribute('data-lottie-autoplay-trigger') && !env.isSafari) {
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
