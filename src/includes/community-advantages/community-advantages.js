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

		this.mqTablet = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT}px)`);

		const onWindowWidthChange = evt => {
			if (evt.matches) {
				this.containers.forEach(container => this._destroySection(container));
			} else {
				this.containers.forEach(container => this._initSection(container));
			}
		};

		this.mqTablet.addEventListener('change', onWindowWidthChange);
		onWindowWidthChange(this.mqTablet);
	}
	_initSection(container) {
		const scrollWrapper = container.querySelector('.community-advantages__wrapper');
		container.scrollWrapperElement = scrollWrapper;

		const getToValue = () => (scrollWrapper.scrollHeight / window.innerHeight) * window.innerHeight;
		const isTopPos = scrollWrapper.getAttribute('data-community-advantages-wrapper') === 'top';

		if (!isTopPos) {
			gsap.set(scrollWrapper, {
				y: window.innerHeight,
			});
		}

		const initTopWrapperScrollTrigger = () => {
			container.scrollTrigger = ScrollTrigger.create({
				trigger: container,
				start: 'top top',
				end: `+=${scrollWrapper.scrollHeight - window.innerHeight}`,
				pin: true,
				invalidateOnRefresh: true,
				scrub: true,
			});
			container.scrollWrapper = gsap.set(scrollWrapper, {
				y: 0,
				scrollTrigger: {
					trigger: container,
					start: 'top top',
					end: `+=${scrollWrapper.scrollHeight - window.innerHeight}`,
					invalidateOnRefresh: true,
					scrub: true,
					onUpdate: self => {
						gsap.set(scrollWrapper, {
							y: -(scrollWrapper.scrollHeight - window.innerHeight) * self.progress,
						});
					},
				},
			});
		};

		const defaultWrapperScrollTrigger = () => {
			container.scrollTrigger = ScrollTrigger.create({
				trigger: container,
				start: 'top top',
				end: `+=${getToValue()}`,
				pin: true,
				invalidateOnRefresh: true,
				scrub: true,
				onLeave: () => {
					if (!this._onWindowScroll) {
						const title = document.querySelector('[data-community-advantages-title="top"]');

						if (title) {
							this.lastScrollY = window.scrollY + title.offsetHeight;
							this.startMarginBottom = parseFloat(getComputedStyle(title).marginBottom);

							this._onWindowScroll = () => {
								const deltaY = this.lastScrollY - window.scrollY;

								title.style.marginBottom = getComputedStyle(title).marginBottom;
								title.style.marginTop = 'auto';

								let currentMarginBottom = this.startMarginBottom + deltaY;
								currentMarginBottom = currentMarginBottom < 0 ? 0 : currentMarginBottom;

								title.style.marginBottom = `${currentMarginBottom}px`;
							};
							this._onWindowScroll = this._onWindowScroll.bind(this);
							window.addEventListener('scroll', this._onWindowScroll);
						}
					}
				},
			});
			container.scrollWrapper = gsap.set(scrollWrapper, {
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
		};

		if (isTopPos) {
			initTopWrapperScrollTrigger();
		} else {
			defaultWrapperScrollTrigger();
		}

		if (container.hasAttribute('data-background')) {
			const bgColor = container.getAttribute('data-background');

			container.bgColor = gsap.to('[data-community-advantages]', {
				scrollTrigger: {
					trigger: container,
					start: 'top bottom',
					end: 'bottom bottom',
					scrub: true,
				},
				background: bgColor,
			});
		}
	}
	_destroySection(container) {
		container.scrollTrigger && container.scrollTrigger.kill();

		if (container.scrollWrapper) {
			container.scrollWrapper.kill();
			container.scrollWrapper.scrollTrigger && container.scrollWrapper.scrollTrigger.kill();
		}

		if (container.bgColor) {
			container.bgColor.kill();
			container.bgColor.scrollTrigger && container.bgColor.scrollTrigger.kill();
		}

		window.removeEventListener('scroll', this._onWindowScroll);

		gsap.set(container, { clearProps: true });
		gsap.set(container.scrollWrapperElement, { clearProps: true });
		gsap.set('.community-advantages__title', { clearProps: true });
	}
}

export default new CommunityAdvantages();
