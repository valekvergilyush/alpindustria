const ClassName = {
	FILLED: '_filled',
};

class InputFile {
	constructor() {
		this.init();
	}

	init() {
		this.inputContainers = document.querySelectorAll('[data-input-file]');

		if (!this.inputContainers.length) {
			return;
		}

		this.inputContainers.forEach(container => this._initInput(container));
	}
	_initInput(container) {
		const input = container.querySelector('.input-file__input');
		const label = container.querySelector('.input-file__label');
		const labelText = label.textContent;
		const removeButton = container.querySelector('.input-file__remove-btn');

		input.addEventListener('change', () => {
			label.textContent = input.files[0].name;
			container.classList.add(ClassName.FILLED);
		});
		removeButton.addEventListener('click', evt => {
			evt.preventDefault();

			input.value = '';
			label.textContent = labelText;
			container.classList.remove(ClassName.FILLED);
		});
	}
}

export default new InputFile();
