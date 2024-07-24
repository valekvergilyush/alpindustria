import { ScrollTrigger } from 'gsap/ScrollTrigger';
import utils from '../../assets/js/utils/utils';

const ClassName = {
	ACTIVE: '_active',
	SCROLLING: '_scrolling',
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

		setTimeout(() => {
			this.container.classList.add('_inited');
		}, 400);
	}

	initShowMore() {
		const toggles = this.container.querySelectorAll('[data-show-more-toggle]');
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
		const container = this.container.querySelector('[data-compare-container]');
		const cols = this.container.querySelectorAll('td');
		const prevButton = this.container.querySelector('.compare__nav-button._prev');
		const nextButton = this.container.querySelector('.compare__nav-button._next');
		let colWidth = cols[0].offsetWidth;
		this.colWidth = colWidth;
		let leftPos = cols[0].getBoundingClientRect().left;
		this.leftPos = leftPos;
		let xPos = 0;
		let isScrolling = false;

		const updateDisabled = utils.debounce(() => {
			isScrolling = false;
			this.container.classList.remove(ClassName.SCROLLING);
			prevButton.disabled = xPos === 0;
			nextButton.disabled = container.scrollWidth - window.innerWidth <= xPos;

			cols.forEach(col => {
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
				xPos += direction * colWidth;
				container.scrollTo({ left: xPos, behavior: 'smooth' });
				updateDisabled();
			};
		};

		prevButton.addEventListener('click', handleScroll(-1));
		nextButton.addEventListener('click', handleScroll(1));

		window.addEventListener('resize', () => {
			container.scrollTo({ left: 0 });
			xPos = 0;
			colWidth = cols[0].offsetWidth;
			leftPos = cols[0].getBoundingClientRect().left;
			this.colWidth = colWidth;
			this.leftPos = leftPos;
			updateDisabled();
		});

		updateDisabled();
	}
	initHeader() {
		const header = document.querySelector('[data-compare-header]');
		const desc = this.container.querySelector('.compare__col._desc');
		const colWidth = this.colWidth;
		const leftPos = this.leftPos.toFixed(0);
		const headerRect = header.getBoundingClientRect();

		header.style.setProperty('--col-width', `${colWidth}px`);
		header.style.setProperty('--left-pos', `${leftPos}px`);

		window.addEventListener('resize', () => {
			header.style.setProperty('--col-width', `${colWidth}px`);
			header.style.setProperty('--left-pos', `${leftPos}px`);
		});

		ScrollTrigger.create({
			trigger: desc,
			start: `top top+=${headerRect.bottom}`,
			onEnter: () => {
				header.classList.add(ClassName.ACTIVE);
			},
			onLeaveBack: () => {
				header.classList.remove(ClassName.ACTIVE);
			},
		});
	}
}

export default new Compare();
