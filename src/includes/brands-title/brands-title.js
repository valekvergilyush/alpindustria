class BrandsTitle {
	constructor() {
		this.scrollBlock = document.querySelector('[data-brands-scroll]');
		this.init();
	}

	init() {
		if (!this.scrollBlock) {
			return;
		}
		this.initScrollBlock();
	}

	initScrollBlock() {
		const elem = this.scrollBlock;
		elem.style.cursor = 'grab';

		let pos = { top: 0, left: 0, x: 0, y: 0 };

		const scrollMouseMoveHandler = function (e) {
			const dx = e.clientX - pos.x;
			const dy = e.clientY - pos.y;
			elem.scrollTop = pos.top - dy;
			elem.scrollLeft = pos.left - dx;
		};

		const scrollMouseUpHandler = function () {
			elem.style.cursor = 'grab';
			elem.style.removeProperty('user-select');

			document.removeEventListener('mousemove', scrollMouseMoveHandler);
			document.removeEventListener('mouseup', scrollMouseUpHandler);
		};

		const scrollMouseDownHandler = function (e) {
			elem.style.cursor = 'grabbing';
			elem.style.userSelect = 'none';

			pos = {
				left: elem.scrollLeft,
				top: elem.scrollTop,
				x: e.clientX,
				y: e.clientY,
			};

			document.addEventListener('mousemove', scrollMouseMoveHandler);
			document.addEventListener('mouseup', scrollMouseUpHandler);
		};

		elem.addEventListener('mousedown', scrollMouseDownHandler);
	}
}

export default new BrandsTitle();
