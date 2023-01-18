const GRAB_CLASS = '_grab';

class DragScroll {
	constructor(container) {
		this.container = container;
		this.init();
	}

	init() {
		if (!this.container) {
			return;
		}

		this.pos = { top: 0, left: 0, x: 0, y: 0 };

		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onMouseDown = this.onMouseDown.bind(this);
		this.containerHasScroll = this.containerHasScroll.bind(this);

		console.log(this.container);
		const { hasHorizontalScrollbar, hasVerticalScrollbar } = this.containerHasScroll(
			this.container
		);
		this.container.addEventListener('mousedown', this.onMouseDown);
		if (hasHorizontalScrollbar || hasVerticalScrollbar) {
			this.container.classList.add(GRAB_CLASS);
		}
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

		this.container.style.cursor = '';
		this.container.style.removeProperty('user-select');
	}
	onMouseDown(evt) {
		const { hasHorizontalScrollbar, hasVerticalScrollbar } = this.containerHasScroll(
			this.container
		);
		if (!hasHorizontalScrollbar && !hasVerticalScrollbar) {
			return;
		}
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
	containerHasScroll(container) {
		const hasHorizontalScrollbar = container.scrollWidth > container.clientWidth;
		const hasVerticalScrollbar = container.scrollHeight > container.clientHeight;
		return {
			hasHorizontalScrollbar,
			hasVerticalScrollbar,
		};
	}
}

export default DragScroll;
