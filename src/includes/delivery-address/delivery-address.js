import Popups from "../../assets/js/modules/Popups";

class DeliveryAddress {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.delivery-address');

		if (!this.container) {
			return;
		}

		this.section = this.container.querySelector('.delivery-address__radios').parentElement;
		this.radios = this.container.querySelectorAll('.delivery-address__radios [type="radio"]');
		this.editAddressBtn = this.container.querySelector('[data-edit-address]');
		this.sectionMod = '_courier';

		this.radios.forEach(radio => {
			radio.addEventListener('change', evt => {
				const deliveryWay = evt.target.getAttribute('data-value');

				if (this.section.classList.contains(this.sectionMod)) {
					this.section.classList.remove(this.sectionMod);
					this.sectionMod = `_${deliveryWay}`;
				}
				this.section.classList.add(this.sectionMod);
			});
		});
		if (this.editAddressBtn) {
			this.editAddressBtn.addEventListener('click', evt => {
				evt.preventDefault();
				this.container.classList.toggle('_edit');
			});
		}
	}
	setCdekAddress() {
		this.section.classList.add('_cdek-address');
		Popups.open('cart');
	}
}

export default new DeliveryAddress();
