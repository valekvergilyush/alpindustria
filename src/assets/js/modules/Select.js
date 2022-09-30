import customSelect from 'custom-select';
import Availability from './Availability';
class Select {
	constructor() {
		this.selects = document.querySelectorAll('[data-select]');
		this.init();
	}

	init() {
		if (!this.selects.length) {
			return;
		}

		this.selectList = [];

		this.selects.forEach(select => {
			customSelect(select);

			select.customSelect.container.addEventListener('custom-select:open', () => {
				select.customSelect.panel.scrollTo(0, 0);
			});

			if (select.getAttribute('data-select') === 'color') {
				this._initColorSelect(select);
			}

			if (select.getAttribute('data-select') === 'availability') {
				select.addEventListener('change', e => {
					Availability.checkAvailabilityCity(e.target.value);
				});
			}
		});
	}
	_initColorSelect(select) {
		const openerSpan = select.customSelect.opener.querySelector('span');
		const options = select.customSelect.select.options;
		const customOptions = select.customSelect.panel.querySelectorAll('[role="option"]');

		openerSpan.classList.add('custom-select-opener-color');
		openerSpan.style.backgroundColor = select.value;

		select.addEventListener('change', evt => {
			openerSpan.style.backgroundColor = evt.target.value;
		});

		Array.from(options).forEach((opt, index) => {
			const colorElement = document.createElement('span');

			colorElement.classList.add('custom-select-color');
			colorElement.style.backgroundColor = opt.value;

			customOptions[index].append(colorElement);
		});
	}
}

export default new Select();
