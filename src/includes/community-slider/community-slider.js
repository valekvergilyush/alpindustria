import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TABLET_BREAKPOINT = 768;

class CommunitySlider {
	constructor() {
		this.containers = document.querySelectorAll('[data-community-slider], [data-about-slider]');
		this.containers.forEach(container => this.init(container));
	}

	init(container) {
		if (!container || window.innerWidth <= TABLET_BREAKPOINT) {
			return;
		}

		const slide = container.querySelector('[data-slide]');
		this.linePath = container.querySelector('[data-community-slider-line-img] path');

		if (this.linePath) {
			this.pathLength = this.linePath.getTotalLength();
			this.linePath.style.setProperty('--path-length', this.pathLength);
		}

		const getToValue = () => slide.scrollWidth - window.innerWidth;

		ScrollTrigger.create({
			trigger: container,
			start: 'top top',
			end: `+=${getToValue() + 50}`,
			pin: true,
			invalidateOnRefresh: true,
			scrub: true,
		});

		gsap.set(slide, {
			x: 0 - getToValue(),
			scrollTrigger: {
				trigger: container,
				start: 'top top',
				end: `+=${getToValue()}`,
				invalidateOnRefresh: true,
				scrub: true,
				onUpdate: self => {
					gsap.set(slide, {
						x: 0 - getToValue() * self.progress,
					});

					if (this.linePath) {
						const strokeDashoffset = this.pathLength - this.pathLength * self.progress * 2;

						this.linePath.style.strokeDashoffset = strokeDashoffset <= 0 ? 0 : strokeDashoffset;
					}
				},
			},
		});
	}
}

export default new CommunitySlider();
