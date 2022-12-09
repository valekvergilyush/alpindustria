const ClassName = {
	OPENED: '_opened',
	TICKER: '_ticker',
};

const DURATION = 0.4;

class CatalogAccordion {
	constructor() {
		this.init();
	}

	init() {
		this.sections = document.querySelectorAll('[data-accordion-section]');

		this.sections.length &&
			this.sections.forEach((section, index) => {
				section.opened = false;

				if (index === this.sections.length - 1) {
					this.lastSection = section;
				}

				if (section.classList.contains(ClassName.OPENED)) {
					section.opened = true;
					this.openedSection = section;
					this.openedSectionContent = section.querySelector('[data-accordion-content]');
				}

				if (!section.opened && !this.offset) {
					this.offset = parseFloat(getComputedStyle(section).marginBottom);
				}

				const btnOpen = section.querySelector('[data-accordion-title]');

				btnOpen.addEventListener('click', () => {
					this.toggle(section);
				});

				this.addTickerClass(section);
			});
	}
	toggle(section) {
		const content = section.querySelector('[data-accordion-content]');

		if (!content) {
			return;
		}
		const contentHeight = content.scrollHeight;

		if (this.openedSection === section) {
			this.close(section, content, true);
		} else {
			const cb = () => {
				this.close(this.openedSection, this.openedSectionContent);
			};
			if (this.openedSection && this.openedSectionContent) {
				this.open(section, content, contentHeight, cb);
			} else {
				this.open(section, content, contentHeight);
			}
		}
	}
	open(section, content, contentHeight, cb) {
		const startTicker = () => {
			const title = section.querySelector('[data-accordion-title]');

			if (title.classList.contains(ClassName.TICKER)) {
				const titleText = section.querySelector('[data-accordion-title-text]');
				const paddingRight = window.innerWidth < 768 ? 80 : 150;
				const offset = title.offsetWidth - titleText.offsetWidth - paddingRight;
				titleText.ticker = gsap.to(titleText, {
					x: offset,
					duration: 3,
					yoyo: true,
					repeat: -1,
					yoyoEase: 'power1.in',
					ease: 'power1.in',
				});
			}
		};

		section.querySelector('[data-accordion-title]').classList.add(ClassName.OPENED);

		gsap.to(content, {
			height: contentHeight,
			clearProps: 'height',
			duration: DURATION * 2,
		});
		gsap.to(section, {
			y: 0,
			marginBottom: -1,
			clearProps: 'marginBottom,transform',
			duration: DURATION,
			onComplete: () => {
				section.classList.add(ClassName.OPENED);
				cb && cb();
				this.openedSection = section;
				this.openedSectionContent = content;
				startTicker();
			},
		});
	}
	close(section, content, clear = false) {
		const stopTicker = () => {
			const titleText = section.querySelector('[data-accordion-title-text]');

			titleText.ticker && titleText.ticker.revert();
		};

		section.querySelector('[data-accordion-title]').classList.remove(ClassName.OPENED);

		gsap.to(content, {
			height: 0,
			duration: DURATION,
			clearProps: 'height',
		});
		gsap.to(section, {
			marginBottom: section === this.lastSection ? -1 : this.offset,
			clearProps: 'marginBottom',
			duration: DURATION,
			onComplete: () => {
				if (clear) {
					this.openedSection = null;
					this.openedSectionContent = null;
				}
				section.classList.remove(ClassName.OPENED);
				stopTicker();
			},
		});
	}
	addTickerClass(section) {
		const title = section.querySelector('[data-accordion-title]');
		const titleText = section.querySelector('[data-accordion-title-text]');

		const titlePL = parseFloat(getComputedStyle(title).paddingLeft);
		const titlePR = parseFloat(getComputedStyle(title).paddingRight);
		const titleTextPL = parseFloat(getComputedStyle(titleText).paddingLeft);
		const titleTextPR = parseFloat(getComputedStyle(titleText).paddingRight);

		const titleContentWidth = title.scrollWidth - titlePL - titlePR;
		const titleTextContentWidth = titleText.scrollWidth - titleTextPL - titleTextPR;

		if (titleContentWidth < titleTextContentWidth) {
			title.classList.add(ClassName.TICKER);
		}
	}
}

export default new CatalogAccordion();
