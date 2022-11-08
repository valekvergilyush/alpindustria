import lottie from 'lottie-web';

class LottieAnimations {
	constructor() {
		document.querySelectorAll('[data-lottie-animation]').forEach(el => {
			this.initPlayer(el, el.getAttribute('data-lottie-animation'));
			el.lottieAnimation = this;
		});
	}
	initPlayer(container, path) {
		let isAutoplay = true;
		if (container.getAttribute('data-lottie-autoplay') === 'false') {
			isAutoplay = false;
		}

		this.player = lottie.loadAnimation({
			container: container,
			renderer: 'svg',
			loop: false,
			autoplay: isAutoplay,
			path: path,
		});

		isAutoplay && this.player.play();
	}
	play() {
		this.player.play();
	}
}

export default new LottieAnimations();
