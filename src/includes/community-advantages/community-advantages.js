import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TABLET_BREAKPOINT = 768;

class CommunityAdvantages {
	constructor() {
		this.init();
	}

	init() {
		this.containers = document.querySelectorAll('[data-community-advantages]');

		if (!this.containers.length || window.innerWidth <= TABLET_BREAKPOINT) {
			return;
		}

		this.containers.forEach(container => this._initSection(container));
	}
	_initSection(container) {
		const scrollWrapper = container.querySelector('.community-advantages__wrapper');

		const getToValue = () => (scrollWrapper.scrollHeight / window.innerHeight) * window.innerHeight;

		gsap.set(scrollWrapper, {
			y: window.innerHeight,
		});

		ScrollTrigger.create({
			trigger: container,
			start: 'top top',
			end: `+=${getToValue()}`,
			pin: true,
			invalidateOnRefresh: true,
			scrub: true,
		});

		gsap.set(scrollWrapper, {
			y: 0,
			scrollTrigger: {
				trigger: container,
				start: 'top top',
				end: `+=${scrollWrapper.scrollHeight}`,
				invalidateOnRefresh: true,
				scrub: true,
				onUpdate: self => {
					gsap.set(scrollWrapper, {
						y: window.innerHeight - getToValue() * self.progress,
					});
				},
			},
		});
	}
}

export default new CommunityAdvantages();
