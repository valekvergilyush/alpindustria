import Picker from 'pickerjs';

const BODY_STYLE = document.body.style;
const HTML_CLASSLIST = document.documentElement.classList;
const ClassName = {
	POPUP_OPENED: '_popup-opened',
};

const OPTIONS = {
	format: 'HH:mm',
	text: {
		cancel: 'Закрыть',
		confirm: 'OK',
	},
};

class InputTime {
	constructor() {
		this.init();
	}

	init() {
		this.inputs = document.querySelectorAll('[data-timepicker]');

		if (!this.inputs.length) {
			return;
		}

		this.inputs.forEach(input => {
			input.timepicker = new Picker(input, OPTIONS);

			input.addEventListener('hidden', () => {
				if (HTML_CLASSLIST.contains(ClassName.POPUP_OPENED)) {
					BODY_STYLE.paddingRight = 0;
					BODY_STYLE.overflow = 'hidden';
				}
			});
		});
	}
}

export default new InputTime();
