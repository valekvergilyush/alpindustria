import Picker from 'pickerjs';

const formatDate = (date = new Date()) => {
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();

	return `${day}.${month}.${year}`;
};
const addDays = (date = new Date(), qty = 1) => {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + qty);

	return newDate;
};

const OPTIONS = {
	format: 'DD.MMMM.YYYY',
	text: {
		cancel: 'Закрыть',
		confirm: 'OK',
	},
	months: [
		'Январь',
		'Февраль',
		'Март',
		'Апрель',
		'Май',
		'Июнь',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Декабрь',
	],
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
			input.datepicker = new Picker(input, OPTIONS);
			input.datepicker.picker.classList.add('_date');

			input.addEventListener('change', () => {
				input.value = formatDate(input.datepicker.date);
			});
		});

		this.rangeDateContainers.forEach(container => {
			const startInput = container.querySelector('[data-start-date]');
			const endInput = container.querySelector('[data-end-date]');

			const start = new Date();
			const end = addDays(start, 1);

			startInput.value = formatDate(start);
			endInput.value = formatDate(end);

			[startInput, endInput].forEach(input => {
				input.addEventListener('change', () => {
					const startVal = startInput.datepicker.date;
					const endVal = endInput.datepicker.date;

					if (startVal > endVal) {
						endInput.value = formatDate(startVal);
						endInput.datepicker.setDate(startVal);
					}
				});
			});
		});
	}
}

export default new InputDate();
