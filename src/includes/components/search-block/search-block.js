const CLASS_ACTIVE = '_active';

class SearchBlock {
	constructor() {
		this.searchBlocks = document.querySelectorAll('[data-search]');
		this.clickOutHandler = this.clickOutHandler.bind(this);
		this.init();
	}

	init() {
		if (!this.searchBlocks.length) {
			return;
		}
		this.searchBlocks.forEach(searchBlock => {
			this.initSearchBlock(searchBlock);
		});
	}

	initSearchBlock(block) {
		const openBtn = block.querySelector('[data-search-open]');
		if (openBtn) {
			openBtn.addEventListener('click', () => {
				block.classList.add(CLASS_ACTIVE);
				this.activeSearchBlock = block;
				setTimeout(() => {
					document.addEventListener('click', this.clickOutHandler);
				});
			});
		}
		block.addEventListener('submit', e => {
			e.preventDefault();
			block.classList.remove(CLASS_ACTIVE);
			this.activeSearchBlock = false;
			document.removeEventListener('click', this.clickOutHandler);
		});
	}

	clickOutHandler(e) {
		if (e.target.closest('[data-search]') || !this.activeSearchBlock) {
			return;
		}
		this.activeSearchBlock.classList.remove(CLASS_ACTIVE);
		document.removeEventListener('click', this.clickOutHandler);
	}
}

export default new SearchBlock();
