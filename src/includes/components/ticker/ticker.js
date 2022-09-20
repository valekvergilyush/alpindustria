class Ticker {
	constructor() {
		this.init();
	}

	init() {
		const container = document.querySelector('.ticker__container');
		const text = container.querySelector('.ticker__text');
		container.append(text.cloneNode(true));
		container.append(text.cloneNode(true));
		container.append(text.cloneNode(true));
		container.append(text.cloneNode(true));
		container.append(text.cloneNode(true));
		container.append(text.cloneNode(true));
		container.append(text.cloneNode(true));
	}
}

export default new Ticker();
