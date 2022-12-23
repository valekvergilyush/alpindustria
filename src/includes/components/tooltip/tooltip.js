import tippy from 'tippy.js';

class Tooltip {
	constructor() {
		this.init();
	}

	init() {
		tippy('[data-tippy-content]', {
			offset: [0, 18],
			maxWidth: 210,
		});
	}
}

export default new Tooltip();
