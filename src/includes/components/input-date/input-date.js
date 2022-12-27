import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru';

const OPTIONS = {
	disableMobile: 'true',
	dateFormat: 'd/m/y',
	locale: Russian,
};
class InputDate {
	constructor() {
		this.flatpickrs = [];
		this.init();
	}

	init() {
		this.inputs = document.querySelectorAll('[data-datepicker]');
		this.rangeDateContainers = document.querySelectorAll('[data-range-date]');

		if (!this.inputs.length) {
			return;
		}

		this.inputs.forEach(input => {
			const minDate = input.dataset.minDate || false;
			const maxDate = input.dataset.maxDate || false;
			input.flatpickrInstance = flatpickr(input, {
				...OPTIONS,
				minDate,
				maxDate,
			});
			this.flatpickrs.push(input.flatpickrInstance);
		});

		this.rangeDateContainers.forEach(container => {
			const startInput = container.querySelector('[data-start-date]');
			const endInput = container.querySelector('[data-end-date]');

			startInput.flatpickrInstance.config.onChange.push(function (selectedDates) {
				endInput.flatpickrInstance.set('minDate', selectedDates[0]);
			});
		});

		const closeFlatpickrBlocks = document.querySelectorAll('[data-flatpickr-scroll="close"]');
		closeFlatpickrBlocks.forEach(block => {
			block.addEventListener('scroll', () => {
				this.flatpickrs.forEach(f => {
					if (f.isOpen) {
						f.close();
					}
				});
			});
		});
	}
}

export default new InputDate();
