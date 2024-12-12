import IMask from 'imask';
import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru';

const OPTIONS = {
	disableMobile: 'true',
	dateFormat: 'd.m.Y',
	locale: Russian,
};

class InputDate {
	constructor() {
		this.init();
	}

	init() {
		const datepickerInputs = document.querySelectorAll('[data-datepicker]');
		const dateInputs = document.querySelectorAll('[data-dateinput]');

		datepickerInputs.forEach(input => {
			const minDate = input.dataset.minDate || false;
			const maxDate = input.dataset.maxDate || false;
			const defaultDate = input.dataset.minDate === 'today' && new Date();
			input.flatpickrInstance = flatpickr(input, {
				...OPTIONS,
				minDate,
				maxDate,
				defaultDate,
			});
		});

		dateInputs.forEach(input => {
			const dateMask = IMask(input, {
				mask: Date,
			});
			input.dateMask = dateMask;

			input.addEventListener('focus', () => {
				dateMask.updateOptions({ lazy: false });
			});
			input.addEventListener('blur', () => {
				dateMask.updateOptions({ lazy: true });
			});
		});
	}
}

export default new InputDate();
