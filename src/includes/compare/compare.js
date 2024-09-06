import { ScrollTrigger } from 'gsap/ScrollTrigger';
import utils from '../../assets/js/utils/utils';
import gsap from 'gsap';

const ClassName = {
	ACTIVE: '_active',
	SCROLLING: '_scrolling',
	HIDE: '_hide',
};

class Compare {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('[data-compare]');

		if (!this.container) {
			return;
		}

		this.initShowMore();
		this.initSlider();
		this.initHeader();
		this.initArrows();

		setTimeout(() => {
			this.container.classList.add('_inited');
		}, 400);
	}

	initShowMore() {
		const toggles = this.container.querySelectorAll('[data-show-more-toggle]');
		if (toggles.length === 0) {
			return;
		}
		const toggleText = toggles[0].textContent;
		const closeText = toggles[0].getAttribute('data-close-text');

		toggles.forEach(toggle => {
			toggle.addEventListener('click', evt => {
				evt.preventDefault();

				const text = toggle.previousElementSibling;
				text.classList.toggle(ClassName.ACTIVE);

				toggle.textContent = text.classList.contains(ClassName.ACTIVE) ? closeText : toggleText;
			});
		});
	}
	initSlider() {
		const header = document.querySelector('[data-compare-header]');
		const container = this.container.querySelector('[data-compare-container]');
		const headerContainer = header.querySelector('.compare-header__products-wrapper');
		const cols = this.container.querySelectorAll('td');
		const headerProducts = header.querySelectorAll('.compare-header__product');
		const prevButton = this.container.querySelector('.compare__nav-button._prev');
		const nextButton = this.container.querySelector('.compare__nav-button._next');
		const prevHeaderButton = header.querySelector('.compare__nav-button._prev');
		const nextHeaderButton = header.querySelector('.compare__nav-button._next');
		let colWidth = cols[0].offsetWidth;
		let leftPos = cols[0].getBoundingClientRect().left;
		let xPos = 0;
		let isScrolling = false;

		const updateDisabled = utils.debounce(() => {
			isScrolling = false;
			this.container.classList.remove(ClassName.SCROLLING);
			header.classList.remove(ClassName.SCROLLING);
			prevButton.disabled = xPos === 0;
			prevHeaderButton.disabled = xPos === 0;
			nextButton.disabled = container.scrollWidth - window.innerWidth <= xPos;
			nextHeaderButton.disabled = container.scrollWidth - window.innerWidth <= xPos;

			[...cols, ...headerProducts].forEach(col => {
				const rect = col.getBoundingClientRect();
				const isActive =
					rect.right - colWidth / 2 < window.innerWidth && rect.left > leftPos - colWidth / 2;
				col.classList.toggle(ClassName.ACTIVE, isActive);
			});
		}, 400);

		const handleScroll = direction => {
			return evt => {
				evt.preventDefault();
				if (isScrolling) return;

				isScrolling = true;
				this.container.classList.add(ClassName.SCROLLING);
				header.classList.add(ClassName.SCROLLING);
				xPos += direction * colWidth;
				container.scrollTo({ left: xPos, behavior: 'smooth' });
				headerContainer.scrollTo({ left: xPos, behavior: 'smooth' });
				updateDisabled();
			};
		};

		prevButton.addEventListener('click', handleScroll(-1));
		prevHeaderButton.addEventListener('click', handleScroll(-1));
		nextButton.addEventListener('click', handleScroll(1));
		nextHeaderButton.addEventListener('click', handleScroll(1));

		window.addEventListener('resize', () => {
			container.scrollTo({ left: 0 });
			headerContainer.scrollTo({ left: 0 });
			xPos = 0;
			colWidth = cols[0].offsetWidth;
			leftPos = cols[0].getBoundingClientRect().left;
			updateDisabled();
		});

		updateDisabled();
	}
	initHeader() {
		const header = document.querySelector('[data-compare-header]');
		const desc = this.container.querySelector('.compare__col._desc');
		const firstCol = this.container.querySelector('th');
		let leftPos = firstCol.offsetWidth;

		header.style.setProperty('--left-pos', `${leftPos}px`);

		window.addEventListener('resize', () => {
			leftPos = firstCol.offsetWidth;

			header.style.setProperty('--left-pos', `${leftPos}px`);
		});

		ScrollTrigger.create({
			trigger: desc,
			start: `top top+=${header.offsetHeight * 3}`,
			onEnter: () => {
				header.classList.add(ClassName.ACTIVE);
			},
			onLeaveBack: () => {
				header.classList.remove(ClassName.ACTIVE);
			},
		});

		setTimeout(() => {
			header.classList.add('_inited');
		}, 400);
	}
	initArrows() {
		const container = this.container.querySelector('[data-compare-container]');
		const navContainer = document.querySelector('[data-compare-nav-container]');
		const button = navContainer.querySelector('button');

		window.addEventListener('scroll', () => {
			const buttonRect = button.getBoundingClientRect();
			const containerRect = container.getBoundingClientRect();

			const buttonBottom = buttonRect.bottom;
			const containerBottom = containerRect.bottom;

			const gap = 100;

			if (buttonBottom > containerBottom - gap) {
				navContainer.classList.add(ClassName.HIDE);
			} else {
				navContainer.classList.remove(ClassName.HIDE);
			}
		});
	}
}

export default new Compare();
