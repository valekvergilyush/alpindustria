import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ClassName = {
	ANIMATIONS: 'animations',
	ANIMATED: 'is-animated',
};

const TABLET_BREAKPOINT = 992;

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

			this.animatedBlocks.forEach(block => {
				ScrollTrigger.create({
					trigger: block,
					start: 'center bottom',
					toggleClass: ClassName.ANIMATED,
					once: true,
				});
			});
		}
	}
}

export default new ShowAnimations();
