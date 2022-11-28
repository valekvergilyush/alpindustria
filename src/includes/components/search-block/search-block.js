const CLASS_ACTIVE = '_active';

class SearchBlock {
	constructor() {
		this.searchBlocks = document.querySelectorAll('[data-search]');
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
			});
		}
		block.addEventListener('submit', e => {
			e.preventDefault();
			block.classList.remove(CLASS_ACTIVE);
		});
	}
}

export default new SearchBlock();
