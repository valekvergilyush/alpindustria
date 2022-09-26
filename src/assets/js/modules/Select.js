import customSelect from 'custom-select';
class Select {
	constructor() {
		this.selectBlock = document.querySelector('[data-select]');
		this.init();
	}

	init() {
		this.select = customSelect(this.selectBlock);
		// console.log(this.select[0].select);
		// this.select[0].select.addEventListner('change', e => {
		// 	console.log(`${e.target} has changed it's value 👌`);
		// });
	}
}

export default new Select();
