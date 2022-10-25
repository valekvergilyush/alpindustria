const OPTIONS = {
	multiple: false,
};

const ClassName = {
	OPENED: '_opened',
};

export default class Accordion {
	constructor(elem, opt = OPTIONS) {
		this.options = opt;
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.toggle = this.toggle.bind(this);
		this._getHeighValues = this._getHeighValues.bind(this);

		this.init(elem);
	}

	init(toggle) {
		this.trigger = toggle;
		this.content = this.trigger.nextElementSibling;
		this.parentElement = this.trigger.parentElement;

		this._getHeighValues();

		this.trigger.setAttribute('aria-expanded', false);
		this.parentElement.parentElement.style.setProperty(
			'--item-height',
			`${this.triggerHeight + 1}px`
		);
		this.parentElement.style.setProperty('--height', `${this.triggerHeight}px`);

		toggle.addEventListener('click', this.toggle);
		window.addEventListener('resize', () => {
			this.parentElement.parentElement.removeAttribute('style');
			this.parentElement.removeAttribute('style');
			this._getHeighValues();

			this.parentElement.parentElement.style.setProperty(
				'--item-height',
				`${this.triggerHeight + 1}px`
			);
			this.isExpanded && this.parentElement.style.setProperty('--height', `${this.sumHeight}px`);
			!this.isExpanded &&
				this.parentElement.style.setProperty('--height', `${this.triggerHeight}px`);
		});

		!window.accordions && (window.accordions = []);
		window.accordions.push(this);

		this.trigger.getAttribute('data-accordion-toggle') === 'opened' && this.open();
	}
	toggle() {
		this.isExpanded = this.trigger.getAttribute('aria-expanded') === 'true';
		this.isExpanded ? this.close() : this.open();
	}
	open() {
		!this.options.multiple &&
			window.accordions.forEach(accordion => {
				accordion.isExpanded && accordion.close();
			});

		this.parentElement.classList.add(ClassName.OPENED);
		this.parentElement.style.setProperty('--height', `${this.sumHeight}px`);
		this.trigger.setAttribute('aria-expanded', !this.isExpanded);
		this.isExpanded = !this.isExpanded;
	}
	close() {
		this.parentElement.classList.remove(ClassName.OPENED);
		this.parentElement.parentElement.style.setProperty(
			'--item-height',
			`${this.triggerHeight + 1}px`
		);
		this.parentElement.style.setProperty('--height', `${this.triggerHeight}px`);
		this.trigger.setAttribute('aria-expanded', !this.isExpanded);
		this.isExpanded = !this.isExpanded;
	}
	_getHeighValues() {
		const triggerBorderWidth = getComputedStyle(this.trigger)
			.borderWidth.split(' ')
			.reduce((prevValue, currentValue) => parseFloat(prevValue) + parseFloat(currentValue), 0);
		const contentBorderWidth = getComputedStyle(this.trigger)
			.borderWidth.split(' ')
			.reduce((prevValue, currentValue) => parseFloat(prevValue) + parseFloat(currentValue), 0);

		this.triggerHeight = this.trigger.scrollHeight + triggerBorderWidth + contentBorderWidth;
		this.contentHeight = this.content.scrollHeight;
		this.sumHeight = this.triggerHeight + this.contentHeight;
	}
}
