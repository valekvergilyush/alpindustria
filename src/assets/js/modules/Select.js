import customSelect from 'custom-select';
import Availability from './Availability';
import Utils from '../utils/utils';

const ClassName = {
	OPENED: '_opened',
};

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
			const isColorSelect = select.getAttribute('data-select') === 'color';

			customSelect(select);

			select.customSelect.container.addEventListener('custom-select:open', () =>
				this._onSelectOpen(select)
			);
			select.customSelect.container.addEventListener('custom-select:close', () =>
				this._onSelectClose(select)
			);

			isColorSelect && this._initColorSelect(select);
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
			select.customSelect.opener.style.opacity = 0;
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
	_onSelectOpen(select) {
		const isInViewport = Utils.isElementInViewport(select.customSelect.panel);
		if (!isInViewport) {
			select.customSelect.panel.style.transition = 'none';
			select.customSelect.panel.style.transform = 'translate(0%, -100%)';
			select.customSelect.panel.style.top = '-0.25rem';
		}

		select.customSelect.container.parentElement.classList.add(ClassName.OPENED);
		select.customSelect.panel.scrollTo(0, 0);
		select.onScroll = () => {
			select.customSelect.open = false;
		};
		setTimeout(() => {
			document.addEventListener('scroll', select.onScroll, true);
		}, 300);
	}
	_onSelectClose(select) {
		const isInViewport = Utils.isElementInViewport(select.customSelect.panel);
		if (!isInViewport) {
			select.customSelect.panel.style.transform = 'translateY(-5px)';
			select.customSelect.panel.style.top = '0.25rem';
			select.customSelect.panel.style.transition =
				'transition: opacity .15s ease-out,transform .15s ease-out;';
		}
		select.customSelect.container.parentElement.classList.remove(ClassName.OPENED);
		document.removeEventListener('scroll', select.onScroll, true);
	}
}

export default new Select();
