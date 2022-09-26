const ClassName = {
	OPENED: '_opened',
};

const DURATION = 0.4;

class CatalogAccordion {
	constructor() {
		this.init();
	}

	init() {
		this.sections = document.querySelectorAll('[data-accordion-section]');

		this.sections.length &&
			this.sections.forEach(section => {
				section.opened = false;

				if (section.classList.contains(ClassName.OPENED)) {
					section.opened = true;
					this.openedSection = section;
					this.openedSectionContent = section.querySelector('[data-accordion-content]');
				}

				if (!section.opened && !this.offset) {
					this.offset = parseFloat(getComputedStyle(section).marginBottom);
				}

				section.addEventListener('click', () => {
					this.toggle(section);
				});

				this.addTickerClass(section);
			});
	}
	toggle(section) {
		const content = section.querySelector('[data-accordion-content]');
		const contentHeight = content.scrollHeight;

		if (this.openedSection === section) {
			this.close(section, content);
		} else {
			const cb = () => {
				this.open(section, content, contentHeight);
			};
			if (this.openedSection && this.openedSectionContent) {
				this.close(this.openedSection, this.openedSectionContent, cb);
			} else {
				this.open(section, content, contentHeight);
			}
		}
	}
	open(section, content, contentHeight) {
		section.querySelector('[data-accordion-title]').classList.add(ClassName.OPENED);

		gsap.to(content, {
			height: contentHeight,
			onComplete: () => {
				section.classList.add(ClassName.OPENED);
				this.openedSection = section;
				this.openedSectionContent = content;
			},
			clearProps: 'height',
			duration: DURATION,
		});
		gsap.to(section, {
			y: 0,
			marginBottom: -1,
			clearProps: 'marginBottom,transform',
			duration: DURATION,
		});
	}
	close(section, content, cb) {
		section.querySelector('[data-accordion-title]').classList.remove(ClassName.OPENED);

		gsap.to(content, {
			height: 0,
			duration: DURATION,
			clearProps: 'height',
			onComplete: () => {
				section.classList.remove(ClassName.OPENED);
			},
		});
		gsap.to(section, {
			marginBottom: this.offset,
			clearProps: 'marginBottom',
			duration: DURATION,
			onComplete: () => {
				this.openedSection = null;
				this.openedSectionContent = null;
				cb && cb();
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
			title.classList.add('_ticker');
		}
	}
}

export default new CatalogAccordion();
