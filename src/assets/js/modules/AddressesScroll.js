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

			const direction = this.wheelDirection(evt);
			const documentScrollTop = document.documentElement.scrollTop;
			const scrollCondition =
				(direction === 'up' &&
					this.addressContentScrollProgress !== 0 &&
					documentScrollTop === 0) ||
				(direction === 'down' && this.addressContentScrollProgress !== 100);

			const activeItem = document.querySelector('.addresses-shop._active');
			const tabsPanelWidth = document.querySelector('.addresses__cities').offsetWidth;

			let yScroll = false;
			if (activeItem) {
				const scrollContainer = activeItem.children[0];
				const maxScrollTop = scrollContainer.scrollHeight - scrollContainer.offsetHeight;

				const rect = scrollContainer.getBoundingClientRect();

				const isInViewport =
					rect.left >= tabsPanelWidth &&
					rect.right <= (window.innerWidth || document.documentElement.clientWidth) &&
					rect.top >= 0 &&
					rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);

				if (direction === 'down' && scrollContainer.scrollTop < maxScrollTop && isInViewport) {
					evt.preventDefault();

					yScroll = !yScroll;
					scrollContainer.scrollBy(0, evt.deltaY);
				}

				if (direction === 'up' && scrollContainer.scrollTop !== 0 && isInViewport) {
					evt.preventDefault();

					yScroll = !yScroll;
					scrollContainer.scrollBy(0, evt.deltaY);
				}

				if (yScroll) {
					return;
				}
			}

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
