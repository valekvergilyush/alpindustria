import tippy from 'tippy.js';

class Tooltip {
	constructor() {
		this.init();
	}

	init() {
		document.querySelectorAll('[data-tippy-content]').forEach(el => {
			el.tippy = tippy(el, {
				offset: [0, 16],
				maxWidth: 210,
			});
		});
	}
}

export default new Tooltip();
