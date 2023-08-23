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
		let loop = false;

		if (container.getAttribute('data-lottie-autoplay') === 'false') {
			isAutoplay = false;
		}

		if (container.getAttribute('data-lottie-loop') === 'true') {
			loop = true;
		}

		this.player = lottie.loadAnimation({
			container: container,
			renderer: 'svg',
			loop: loop,
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
