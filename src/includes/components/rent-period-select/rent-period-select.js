const ClassName = {
	OPENED: '_opened',
	ACTIVE: '_active',
};

class RentPeriodSelect {
	constructor() {
		this.init();
	}

	init() {
		this.dropdowns = document.querySelectorAll('[data-rent-period-dropdown]');

		if (!this.dropdowns.length) {
			return;
		}

		this.dropdowns.forEach(dropdown => {
			const toggle = dropdown.querySelector('[data-rent-period-toggle]');
			const list = dropdown.querySelector('[data-rent-period-list]');
			const options = dropdown.querySelectorAll('[data-rent-period-option]');
			const valueDisplay = dropdown.querySelector('[data-rent-period-value]');

			if (!toggle || !list || !options.length || !valueDisplay) {
				return;
			}

			toggle.addEventListener('click', evt => {
				evt.stopPropagation();
				this.toggleDropdown(dropdown);
			});

			options.forEach(option => {
				option.addEventListener('click', evt => {
					evt.stopPropagation();
					this.selectOption(dropdown, option, options, valueDisplay);
				});
			});
		});

		document.addEventListener('click', evt => {
			this.closeAllDropdowns(evt);
		});
	}

	toggleDropdown(dropdown) {
		const isOpened = dropdown.classList.contains(ClassName.OPENED);

		this.dropdowns.forEach(d => {
			if (d !== dropdown) {
				d.classList.remove(ClassName.OPENED);
			}
		});

		if (isOpened) {
			dropdown.classList.remove(ClassName.OPENED);
		} else {
			dropdown.classList.add(ClassName.OPENED);
		}
	}

	selectOption(dropdown, selectedOption, allOptions, valueDisplay) {
		allOptions.forEach(option => {
			option.classList.remove(ClassName.ACTIVE);
		});

		selectedOption.classList.add(ClassName.ACTIVE);

		const text = selectedOption.querySelector('span').textContent;
		valueDisplay.textContent = text;

		dropdown.classList.remove(ClassName.OPENED);
	}

	closeAllDropdowns(evt) {
		this.dropdowns.forEach(dropdown => {
			if (!dropdown.contains(evt.target)) {
				dropdown.classList.remove(ClassName.OPENED);
			}
		});
	}
}

export default new RentPeriodSelect();
