import { ScrollTrigger } from 'gsap/ScrollTrigger';
import env from '../../assets/js/utils/env';

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

			return;
		}

		this.slide = this.container.querySelector('[data-about-slide]');

		const getToValue = () => this.slide.scrollWidth - window.innerWidth;

		ScrollTrigger.create({
			trigger: this.container,
			start: 'top top',
			end: `+=${getToValue() + 50}`,
			pin: true,
			invalidateOnRefresh: true,
			scrub: true,
		});

		gsap.set(this.slide, {
			x: 0 - getToValue(),
			scrollTrigger: {
				trigger: this.container,
				start: 'top top',
				end: `+=${getToValue()}`,
				invalidateOnRefresh: true,
				scrub: true,
				onUpdate: self => {
					gsap.set(this.slide, {
						x: 0 - getToValue() * self.progress,
					});
				},
			},
		});
	}
	startLogoAnimation() {
		const placeholder = document.querySelector('[data-lottie-autoplay-trigger]');

		if (env.isSafari) {
			const staticLogo = document.querySelector('.about-slider__logo-img._static-logo');
			const x = placeholder.offsetWidth - staticLogo.offsetWidth;

			gsap.to(staticLogo, {
				x: x,
				duration: 10,
				ease: 'linear',
				scrollTrigger: {
					trigger: staticLogo,
					start: 'top center',
				},
			});
		} else {
			const logo = document.querySelector('[data-lottie-animation]');
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
}

export default new AboutSlider();
