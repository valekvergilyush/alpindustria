class Counters {
	constructor() {
		this.counters = document.querySelectorAll('[data-counter="block"]');
		this.minNumber = 1;

		this.init();
	}

	init() {
		if (!this.counters.length) {
			return;
		}
		this.counters.forEach(counter => {
			this.initCounter(counter);
		});
	}

	initCounter(counter) {
		const minus = counter.querySelector('[data-counter="minus"]');
		const plus = counter.querySelector('[data-counter="plus"]');
		const number = counter.querySelector('[data-counter="number"]');
		minus.addEventListener('click', () => {
			this.decreaseCounter(number);
		});
		plus.addEventListener('click', () => {
			this.increaseCounter(number);
		});
	}

	decreaseCounter(number) {
		const newValue = Number(number.textContent) - 1;
		number.textContent = newValue < this.minNumber ? this.minNumber : newValue;
	}

	increaseCounter(number) {
		const newValue = Number(number.textContent) + 1;
		number.textContent = newValue;
	}
}

export default new Counters();
