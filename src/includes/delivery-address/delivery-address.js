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
	}
}

export default new DeliveryAddress();
