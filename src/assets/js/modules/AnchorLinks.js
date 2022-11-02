class AnchorLinks {
	constructor() {
		this.anchorLinks = document.querySelectorAll('[data-anchor-link]');

		this.init();
	}

	init = () => {
		this.anchorLinks.forEach(link => {
			link.addEventListener('click', this.anchorLinkClickHandler);
		});
	};

	_updateMaxScroll() {
		this.maxScrollTop =
			Math.max(
				document.body.scrollHeight,
				document.body.offsetHeight,
				document.documentElement.clientHeight,
				document.documentElement.scrollHeight,
				document.documentElement.offsetHeight
			) - window.innerHeight;
	}

	scrollTo(y, immediate = false) {
		// const header = document.querySelector('.header');
		if (typeof y !== 'number') {
			let targetElement;
			if (typeof y === 'string') {
				targetElement = document.querySelector(y);
			} else {
				targetElement = y;
			}
			y =
				targetElement.getBoundingClientRect().top +
				(window.pageYOffset || document.body.scrollTop) /* - header.offsetHeight*/;
		}
		y = y < 0 ? 0 : y;
		this._updateMaxScroll();
		y = y > this.maxScrollTop ? this.maxScrollTop : y;
		const distance = Math.abs(window.pageYOffset - y);
		let duration = distance / 500;
		duration = duration < 0.15 ? 0.15 : duration;
		duration = duration > 1 ? 1 : duration;
		if (immediate) {
			window.scrollTo(0, y);
		} else {
			this.autoScrolling = true;
			gsap.to(window, {
				scrollTo: { y: y },
				duration: duration,
				ease: 'none',
				onStart: () => {
					this.autoScrolling = true;
				},
				onComplete: () => {
					this.autoScrolling = false;
				},
			});
		}
	}

	scrollToBlockByHash(hash) {
		if (hash && hash.length) {
			try {
				const scrollToItem = document.querySelector(hash);
				if (scrollToItem) {
					this.scrollTo(scrollToItem);
				}
			} catch (e) {
				// Do nothing in case on invalid selector
			}
		}
	}

	anchorLinkClickHandler = e => {
		e.preventDefault();
		this.scrollToBlockByHash(e.currentTarget.hash);
		if (e.currentTarget.getAttribute('href') === '#') {
			this.scrollTo(0);
		}
	};
}

export default new AnchorLinks();
