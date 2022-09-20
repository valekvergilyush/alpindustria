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

		this.sections.forEach(section => {
			this.offset = parseFloat(getComputedStyle(section).marginBottom);

			this.addTickerClass(section);

			if (section.classList.contains(ClassName.OPENED)) {
				this.openedSection = section;
				this.openedSectionContent = section.querySelector('[data-accordion-content]');
			}

			section.addEventListener('click', evt => {
				evt.preventDefault();

				this.toggle(section);
			});
		});
	}
	toggle(section) {
		if (this.openedSection === section) {
			return;
		}

		const content = section.querySelector('[data-accordion-content]');
		const contentHeight = content.scrollHeight;

		if (this.openedSection && this.openedSectionContent) {
			this.openedSection.querySelector('[data-accordion-title]').classList.remove(ClassName.OPENED);
			gsap.to(this.openedSectionContent, {
				height: 0,
				duration: DURATION,
				onComplete: () => {
					this.openedSection.classList.remove(ClassName.OPENED);
					this.open(section, content, contentHeight);
				},
				clearProps: 'height',
			});
			gsap.to(this.openedSection, {
				marginBottom: 0 - this.offset,
				clearProps: 'marginBottom',
				duration: DURATION,
			});
		} else {
			this.open(section, content, contentHeight);
		}
	}
	open(section, content, contentHeight) {
		section.querySelector('[data-accordion-title]').classList.add(ClassName.OPENED);
		gsap.to(content, {
			height: contentHeight,
			onComplete: () => section.classList.add(ClassName.OPENED),
			clearProps: 'height',
			duration: DURATION,
		});
		gsap.to(section, { marginBottom: -1, clearProps: 'marginBottom', duration: DURATION });

		this.openedSection = section;
		this.openedSectionContent = content;
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
