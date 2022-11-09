const TABLET_BREAKPOINT = 992;

class AddressesScroll {
	constructor() {
		this.addressContentBlock = document.querySelector('[data-addresses-content]');
		this.addressContentScrollProgress = 0;
		this.init();
	}

	init() {
		if (!this.addressContentBlock) {
			return;
		}
		const addressContentProgressUpdate = this.addressContentProgressUpdate;
		this.addressContentBlock.addEventListener('wheel', evt => {
			addressContentProgressUpdate();
			if (window.innerWidth < TABLET_BREAKPOINT) {
				return;
			}
			if (evt.target.closest('.addresses-shop._active')) {
				return;
			}
			const derection = this.wheelDirection(evt);
			const documtentScrollTop = document.documentElement.scrollTop;
			const scrollCondition =
				(derection === 'up' &&
					this.addressContentScrollProgress !== 0 &&
					documtentScrollTop === 0) ||
				(derection === 'down' && this.addressContentScrollProgress !== 100);
			if (scrollCondition) {
				evt.preventDefault();
				this.addressContentBlock.scrollLeft += evt.deltaY;
			}
		});
	}

	addressContentProgressUpdate = () => {
		const winScroll = this.addressContentBlock.scrollLeft;
		const width = this.addressContentBlock.scrollWidth - this.addressContentBlock.clientWidth;
		const scrolled = (winScroll / width) * 100;
		this.addressContentScrollProgress = scrolled;
	};

	wheelDirection(event) {
		if (event.deltaY < 0) {
			return 'up';
		}
		return 'down';
	}
}

export default new AddressesScroll();
