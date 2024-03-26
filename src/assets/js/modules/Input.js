import intlTelInput from 'intl-tel-input';
import IMask from 'imask';

const ClassName = {
	FILLED: '_filled',
};

const getInputMask = input => input.placeholder.replace(/[0-9]/g, '0');

class Input {
	constructor() {
		this.init();
	}

	init() {
		this.fields = document.querySelectorAll('.input, .input-search, .textarea');

		if (!this.fields.length) {
			return;
		}

		const initInputTelMask = input => {
			const inputMask = getInputMask(input);
			input.mask = IMask(input, { mask: inputMask });
		};

		const updateInputTelMask = input => {
			const inputMask = getInputMask(input);
			input.mask.updateOptions({ mask: inputMask });
			input.mask.unmaskedValue = '';
		};

		this.fields.forEach(field => {
			const input = field.querySelector('input, textarea');

			if (input.value) {
				field.classList.add(ClassName.FILLED);
			}

			if (input.inputMode === 'tel') {
				const iti = intlTelInput(input, {
					utilsScript: '/assets/jsons/tel-input-utils.js',
					initialCountry: 'ru',
					onlyCountries: ['ru', 'am', 'by', 'kg'],
					separateDialCode: true,
					customPlaceholder: selectedCountryPlaceholder => selectedCountryPlaceholder,
				});
				input.iti = iti;
				input.setAttribute('data-country-code', `+${iti.getSelectedCountryData().dialCode}`);
				input.addEventListener('countrychange', () => {
					input.value = '';
					input.setAttribute('data-country-code', `+${iti.getSelectedCountryData().dialCode}`);
					if (input.mask) {
						updateInputTelMask(input);
					}
				});
				input.addEventListener('input', evt => {
					const val = evt.target.value;
					const start7 = val.startsWith('+7');
					const start8 = val.startsWith('8') || val.startsWith('7');

					start7 && (evt.target.value = val.slice(2));
					start8 && (evt.target.value = val.slice(1));

					if (input.placeholder.length === val.length) {
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

				iti.promise.then(() => {
					initInputTelMask(input);
				});
			}

			input.addEventListener('input', () => {
				if (input.value) {
					field.classList.add(ClassName.FILLED);
				} else {
					field.classList.remove(ClassName.FILLED);
				}
			});
			input.addEventListener('change', () => {
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
