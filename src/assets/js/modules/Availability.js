class Availability {
	constructor() {
		this.select = document.querySelector('[data-select="availability"]');
		this.cities = document.querySelectorAll('[data-availability]');
		this.init();
	}
	init() {
		this.checkAvailabilityCity(this.select.value);
	}

	checkAvailabilityCity(value) {
		if (!this.cities.length) {
			return;
		}
		this.cities.forEach(function (city) {
			if (city.dataset.availability === value) {
				city.style.display = 'flex';
				return;
			}
			city.style.display = 'none';
		});
	}
}

export default new Availability();
