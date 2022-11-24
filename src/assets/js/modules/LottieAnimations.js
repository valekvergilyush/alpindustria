import lottie from 'lottie-web';
import env from '../utils/env';

class LottieAnimations {
	constructor() {
		document.querySelectorAll('[data-lottie-animation]').forEach(el => {
			this.initPlayer(el, el.getAttribute('data-lottie-animation'));
			el.lottieAnimation = this;
		});
	}
	initPlayer(container, path) {
		const qualityValue = env.isSafari ? 'low' : 'hight';
		let isAutoplay = true;

		if (container.getAttribute('data-lottie-autoplay') === 'false') {
			isAutoplay = false;
		}

		lottie.setQuality(qualityValue);

		this.player = lottie.loadAnimation({
			container: container,
			renderer: 'svg',
			loop: false,
			autoplay: isAutoplay,
			path: path,
		});

		this.player.setSubframe(!env.isSafari);

		isAutoplay && this.player.play();
	}
	play() {
		this.player.play();
	}
}

export default new LottieAnimations();
