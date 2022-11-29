import flatpickr from 'flatpickr';

const OPTIONS = {
	disableMobile: 'true',
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
			flatpickr(input, OPTIONS);
		});
	}
}

export default new InputDate();
