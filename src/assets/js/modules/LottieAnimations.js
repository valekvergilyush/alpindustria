import lottie from 'lottie-web';

class LottieAnimations {
	constructor() {
		document.querySelectorAll('[data-lottie-animation]').forEach(el => {
			this.initPlayer(el, el.getAttribute('data-lottie-animation'));
		});
	}
	initPlayer(container, path) {
		const player = lottie.loadAnimation({
			container: container,
			renderer: 'svg',
			loop: false,
			autoplay: true,
			path: path,
		});

		player.play();
	}
}

export default new LottieAnimations();
