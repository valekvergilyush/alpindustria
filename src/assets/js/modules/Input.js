const ClassName = {
	FILLED: '_filled',
};

class Input {
	constructor() {
		this.init();
	}

	init() {
		this.fields = document.querySelectorAll('.input, .textarea');

		if (!this.fields.length) {
			return;
		}

		this.fields.forEach(field => {
			const input = field.querySelector('input, textarea');

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
