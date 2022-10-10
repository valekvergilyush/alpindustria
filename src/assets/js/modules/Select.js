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
			select.searchField = select.parentElement.querySelector('[data-select-search]');
			customSelect(select);

			select.customSelect.container.addEventListener('custom-select:open', () => {
				select.customSelect.panel.scrollTo(0, 0);
			});

			select.searchField && this._initSearchField(select);

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
	_initSearchField(select) {
		select.searchField.addEventListener('input', evt => {
			const customOptions = select.customSelect.panel.querySelectorAll('[role="option"]');
			const searchValue = evt.target.value.toLowerCase();
			// eslint-disable-next-line no-unused-vars
			let openerTextContent = select.customSelect.opener.querySelector('span').textContent;
			this._filterOptions(customOptions, searchValue);

			if (searchValue) {
				openerTextContent = searchValue;
				select.customSelect.opener.style.opacity = 0;
				select.customSelect.open = true;
			} else {
				openerTextContent = select.customSelect.value;
				select.customSelect.opener.style.opacity = 1;
				select.customSelect.open = false;
			}
		});

		select.addEventListener('change', evt => {
			select.searchField.value = evt.target.value;
		});
	}
	_filterOptions(options, searchValue) {
		options.forEach(option => {
			const label = option.textContent.toLowerCase();
			if (label.indexOf(searchValue) !== -1) {
				option.style.display = 'block';
			} else {
				option.style.display = 'none';
			}
		});
	}
}

export default new Select();
