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
				block.input = block.querySelector('input');
				block.classList.add(CLASS_ACTIVE);
				this.activeSearchBlock = block;
				block.input.focus();
				setTimeout(() => {
					document.addEventListener('click', this.clickOutHandler);
				}, 200);

				if (block.input.value !== '') {
					this.close();
				}
			});
		}
	}

	clickOutHandler(e) {
		if (
			e.target.closest('[data-search]') ||
			!this.activeSearchBlock ||
			this.activeSearchBlock.querySelector('input').value !== ''
		) {
			return;
		}

		if (this.activeSearchBlock.classList.contains(CLASS_ACTIVE)) {
			this.close();
		}
	}
	close() {
		this.activeSearchBlock.querySelector('[data-search-open]').focus();
		this.activeSearchBlock.input.value = '';
		this.activeSearchBlock.input.parentElement.classList.remove('_filled');
		this.activeSearchBlock.classList.add('_closing');
		clearTimeout(this.TO);
		this.TO = setTimeout(() => {
			this.activeSearchBlock.classList.remove('_closing');
		}, 200);
		this.activeSearchBlock.classList.remove(CLASS_ACTIVE);
		document.removeEventListener('click', this.clickOutHandler);
	}
}

export default new SearchBlock();
