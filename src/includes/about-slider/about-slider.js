import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TABLET_BREAKPOINT = 768;

class AboutSlider {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('[data-about-slider]');

		if (!this.container) {
			return;
		}

		if (window.innerWidth <= TABLET_BREAKPOINT) {
			this.startLogoAnimation();
		}
	}
	startLogoAnimation() {
		const logo = document.querySelector('[data-lottie-animation]');
		const placeholder = document.querySelector('[data-lottie-autoplay-trigger]');
		const x = logo.offsetWidth - placeholder.offsetWidth;

		gsap.to(logo, {
			x: -x,
			duration: 10,
			ease: 'linear',
			scrollTrigger: {
				trigger: logo,
				start: 'top center',
				onToggle: () => logo.lottieAnimation.play(),
			},
		});
	}
}

export default new AboutSlider();
