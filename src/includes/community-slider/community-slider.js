import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TABLET_BREAKPOINT = 768;

class CommunitySlider {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('[data-community-slider]');

		if (!this.container || window.innerWidth <= TABLET_BREAKPOINT) {
			return;
		}

		this.slide = this.container.querySelector('[data-community-slide]');
		this.linePath = this.container.querySelector('[data-community-slider-line-img] path');
		this.pathLength = this.linePath.getTotalLength();

		this.linePath.style.setProperty('--path-length', this.pathLength);

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
					const strokeDashoffset = this.pathLength - this.pathLength * self.progress * 2;
					this.linePath.style.strokeDashoffset = strokeDashoffset <= 0 ? 0 : strokeDashoffset;
					gsap.set(this.slide, {
						x: 0 - getToValue() * self.progress,
					});
				},
			},
		});
	}
}

export default new CommunitySlider();
