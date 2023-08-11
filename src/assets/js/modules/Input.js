import intlTelInput from 'intl-tel-input';

const ClassName = {
	FILLED: '_filled',
};

class Input {
	constructor() {
		this.init();
	}

	init() {
		this.fields = document.querySelectorAll('.input, .input-search, .textarea');

		if (!this.fields.length) {
			return;
		}

		this.fields.forEach(field => {
			const input = field.querySelector('input, textarea');

			if (input.value) {
				field.classList.add(ClassName.FILLED);
			}

			if (input.type === 'tel') {
				const iti = intlTelInput(input, {
					utilsScript: '/assets/jsons/tel-input-utils.js',
					initialCountry: 'ru',
					onlyCountries: ['ru', 'am', 'by', 'kg', 'kz'],
					separateDialCode: true,
				});
				input.setAttribute('data-country-code', `+${iti.getSelectedCountryData().dialCode}`);
				input.addEventListener('countrychange', () => {
					input.value = '';
					input.setAttribute('data-country-code', `+${iti.getSelectedCountryData().dialCode}`);
				});
				input.addEventListener('input', evt => {
					if (input.placeholder.length === evt.target.value.length) {
						input.setAttribute('aria-invalid', false);
						input.closest('.input').classList.add('is-valid');
						input.closest('.input').classList.remove('is-invalid');
					} else {
						input.closest('.input').classList.remove('is-valid');
						input.closest('.input').classList.remove('is-invalid');
					}
				});
				input.addEventListener('change', evt => {
					if (input.placeholder.length === evt.target.value.length) {
						input.setAttribute('aria-invalid', false);
						input.closest('.input').classList.add('is-valid');
						input.closest('.input').classList.remove('is-invalid');
					} else {
						input.setAttribute('aria-invalid', true);
						input.closest('.input').classList.remove('is-valid');
						input.closest('.input').classList.add('is-invalid');
					}
				});
			}

			input.addEventListener('input', () => {
				if (input.value) {
					field.classList.add(ClassName.FILLED);
				} else {
					field.classList.remove(ClassName.FILLED);
				}
			});
		});
	}
}

export default new Input();
