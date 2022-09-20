class Ticker {
	constructor() {
		this.init();
	}

	init() {
		this.containers = document.querySelectorAll('.ticker');

		if (!this.containers.length) {
			return;
		}

		this.containers.forEach(ticker => {
			ticker.addEventListener('mouseenter', () => {
				ticker.classList.add('_paused');
			});
			ticker.addEventListener('mouseleave', () => {
				ticker.classList.remove('_paused');
			});
		});
	}
}

export default new Ticker();
