class DragScroll {
	constructor() {
		this.init();
	}

	init() {
		this.dragScrollContainers = document.querySelectorAll('[data-drag-scroll]');

		if (!this.dragScrollContainers.length) {
			return;
		}

		this.pos = { top: 0, left: 0, x: 0, y: 0 };

		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onMouseDown = this.onMouseDown.bind(this);

		this.dragScrollContainers.forEach(el => {
			this.container = el;

			this.container.addEventListener('mousedown', this.onMouseDown);
		});
	}
	onMouseMove(evt) {
		// How far the mouse has been moved
		const dx = evt.clientX - this.pos.x;
		const dy = evt.clientY - this.pos.y;

		// Scroll the element
		this.container.scrollTop = this.pos.top - dy;
		this.container.scrollLeft = this.pos.left - dx;
	}
	onMouseUp() {
		document.removeEventListener('mousemove', this.onMouseMove);
		document.removeEventListener('mouseup', this.onMouseUp);

		this.container.style.cursor = 'grab';
		this.container.style.removeProperty('user-select');
	}
	onMouseDown(evt) {
		this.container.style.cursor = 'grabbing';
		this.container.style.userSelect = 'none';

		this.pos = {
			// The current scroll
			left: this.container.scrollLeft,
			top: this.container.scrollTop,
			// Get the current mouse position
			x: evt.clientX,
			y: evt.clientY,
		};

		document.addEventListener('mousemove', this.onMouseMove);
		document.addEventListener('mouseup', this.onMouseUp);
	}
}

export default new DragScroll();
