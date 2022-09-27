import customSelect from 'custom-select';
import Availability from './Availability';
class Select {
	constructor() {
		this.selectBlock = document.querySelector('[data-select]');
		this.init();
	}

	init() {
		this.selects = customSelect(this.selectBlock);
		this.selects.forEach(select => {
			if (select.select.dataset.select === 'availability') {
				select.select.addEventListener('change', e => {
					Availability.checkAvailabilityCity(e.target.value);
				});
			}
		});
	}
}

export default new Select();
