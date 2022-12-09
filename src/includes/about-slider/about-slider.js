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

		const getToValue = () => logo.scrollWidth - placeholder.offsetWidth;

		ScrollTrigger.create({
			trigger: logo,
			start: 'top top',
			end: `+=${getToValue() + 50}`,
			pin: true,
			invalidateOnRefresh: true,
			scrub: true,
			onToggle: () => logo.lottieAnimation.play(),
		});

		gsap.set(logo, {
			x: 0 - getToValue(),
			scrollTrigger: {
				trigger: logo,
				start: 'top top',
				end: `+=${getToValue()}`,
				invalidateOnRefresh: true,
				scrub: true,
				onUpdate: self => {
					gsap.set(logo, {
						x: 0 - getToValue() * self.progress,
					});
				},
			},
		});
	}
}

export default new AboutSlider();
