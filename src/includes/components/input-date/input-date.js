import AirDatepicker from 'air-datepicker';

const TODAY = new Date();

const OPTIONS = {
	dateFormat: 'dd/MM/yy',
	isMobile: true,
	autoClose: true,
	selectedDates: [TODAY],
	minDate: TODAY,
};

class InputDate {
	constructor() {
		this.init();
	}

	init() {
		this.inputs = document.querySelectorAll('[data-datepicker]');

		if (!this.inputs.length) {
			return;
		}

		this.inputs.forEach(input => {
			input.datepicker = new AirDatepicker(input, OPTIONS);
		});
	}
}

export default new InputDate();
