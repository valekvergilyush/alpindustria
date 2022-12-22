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
			const activeItem = document.querySelector('.addresses-shop._active');
			const tabsPanelWidth = document.querySelector('.addresses__cities').offsetWidth;
			const maxScrollLeft =
				this.addressContentBlock.scrollWidth - window.innerWidth + tabsPanelWidth;
			const scrollCondition =
				(direction === 'down' &&
					this.addressContentBlock.scrollLeft < maxScrollLeft &&
					documentScrollTop === 0) ||
				(direction === 'up' &&
					this.addressContentBlock.scrollLeft !== 0 &&
					documentScrollTop === 0);

			let xScroll = true;

			if (activeItem) {
				const scrollContainer = activeItem.children[0];
				const maxScrollTop = scrollContainer.scrollHeight - scrollContainer.offsetHeight;

				const rect = scrollContainer.getBoundingClientRect();

				const isInViewport =
					rect.left >= tabsPanelWidth &&
					rect.right <= (window.innerWidth || document.documentElement.clientWidth) &&
					rect.top >= 0 &&
					rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);

				if (
					(direction === 'down' && scrollContainer.scrollTop < maxScrollTop && isInViewport) ||
					(direction === 'up' && scrollContainer.scrollTop !== 0 && isInViewport)
				) {
					evt.preventDefault();

					xScroll = false;
					gsap.to(scrollContainer, {
						scrollTo: { y: scrollContainer.scrollTop + (evt.deltaY > 0 ? 100 : -100) },
					});
				}
			}

			if (scrollCondition && xScroll) {
				evt.preventDefault();

				gsap.to(this.addressContentBlock, {
					scrollTo: { x: this.addressContentBlock.scrollLeft + (evt.deltaY > 0 ? 100 : -100) },
				});
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
