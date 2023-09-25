import env from '../../assets/js/utils/env';
import Popups from '../../assets/js/modules/Popups';
import DeliveryAuth from '../delivery-auth/delivery-auth';
import { showInputsError } from '../../assets/js/classes/form-validate';

const ClassName = {
	OPENED_DELIVERY: '_opened-delivery',
	OPENED_PAY: '_opened-pay',
	HIDDEN: 'hidden',
	ANIMATION: '_animation',
	PROFILE: '_profile',
	AUTH: '_auth',
	EDIT: '_edit',
	SMS: '_sms',
	COMPLETE: 'complete',
};

const TABLET_BREAKPOINT = 992;

class Cart {
	constructor() {
		this.init();
	}

	init() {
		this.container = document.querySelector('.cart');

		if (!this.container) {
			return;
		}

		this.popupWrapper = document.querySelector('[data-popup-wrapper=cart]');
		this.popup = this.popupWrapper.querySelector('[data-popup="cart"]');
		this.cart = this.popup.querySelector('.cart');
		this.deliveryOpener = this.container.querySelector('[data-cart-delivery-opener]');
		this.backButtons = this.container.querySelectorAll('[data-cart-back]');
		this.payButton = this.container.querySelector('[data-cart-pay]');
		this.shopButton = this.container.querySelector('[data-cart-shop]');
		this.rentButton = this.container.querySelector('[data-cart-rent]');
		this.rentSubmitButton = this.container.querySelector('[data-cart-rent-submit]');
		this.legalBlock = this.container.querySelector('[data-legal-block]');
		this.legalCheckboxes = this.container.querySelectorAll('[data-legal-checkbox]');
		this.authBtns = this.container.querySelectorAll('[data-auth-btn]');
		this.editProfileDataBtns = this.container.querySelectorAll('[data-edit-profile-data]');
		this.authBlock = this.container.querySelector('[data-contact-auth-block]');
		this.deliveryAuthChange = this.container.querySelectorAll('[data-delivery-auth-change]');
		this.submitAuthBtns = this.container.querySelectorAll('[data-submit-auth]');
		this.submitSmsAuthBtn = this.container.querySelector('[data-submit-sms-auth]');
		this.nextButtons = this.container.querySelectorAll('[data-cart-next]');
		this.editDataButtons = this.container.querySelectorAll('[data-edit-data]');
		this.deliverySection = this.container.querySelector('.cart__delivery');
		this.header = document.querySelector('.page__header');
		this.orderButton = document.querySelector('[data-order-bottom]');

		this.onSubmitButtonClick = this.onSubmitButtonClick.bind(this);
		this.onBackButtonClick = this.onBackButtonClick.bind(this);
		this.onPayButtonClick = this.onPayButtonClick.bind(this);
		this.onShopButtonClick = this.onShopButtonClick.bind(this);
		this.onRentButtonClick = this.onRentButtonClick.bind(this);
		this.onRentSubmitButtonClick = this.onRentSubmitButtonClick.bind(this);
		this.onLegalCheckboxChange = this.onLegalCheckboxChange.bind(this);
		this.onAuthBtnClick = this.onAuthBtnClick.bind(this);
		this.onAuthBtnChangeClick = this.onAuthBtnChangeClick.bind(this);
		this.onEditProfileDataBtnClick = this.onEditProfileDataBtnClick.bind(this);
		this.onSubmitAuthBtnClick = this.onSubmitAuthBtnClick.bind(this);
		this.onSubmitSmsAuthBtnClick = this.onSubmitSmsAuthBtnClick.bind(this);
		this.onNextButtonClick = this.onNextButtonClick.bind(this);
		this.onEditDataButtonClick = this.onEditDataButtonClick.bind(this);

		this.deliveryOpener.addEventListener('click', this.onSubmitButtonClick);
		this.payButton.addEventListener('click', this.onPayButtonClick);
		this.backButtons.forEach(button => button.addEventListener('click', this.onBackButtonClick));
		this.shopButton.addEventListener('click', this.onShopButtonClick);
		this.rentButton.addEventListener('click', this.onRentButtonClick);
		this.legalCheckboxes.forEach(checkbox => {
			checkbox.addEventListener('change', this.onLegalCheckboxChange);
		});
		this.deliveryAuthChange.forEach(btn => {
			btn.addEventListener('click', this.onAuthBtnChangeClick);
		});
		this.authBtns.forEach(btn => {
			btn.addEventListener('click', this.onAuthBtnClick);
		});
		this.editProfileDataBtns.forEach(btn => {
			btn.addEventListener('click', this.onEditProfileDataBtnClick);
		});
		this.submitAuthBtns.forEach(btn => {
			btn.addEventListener('click', this.onSubmitAuthBtnClick);
		});
		this.nextButtons.forEach(btn => {
			btn.addEventListener('click', this.onNextButtonClick);
		});
		this.editDataButtons.forEach(btn => {
			btn.addEventListener('click', this.onEditDataButtonClick);
		});
		if (this.submitSmsAuthBtn) {
			this.submitSmsAuthBtn.addEventListener('click', this.onSubmitSmsAuthBtnClick);
		}
	}
	onSubmitButtonClick(evt) {
		evt.preventDefault();

		this.openDelivery();
	}
	onBackButtonClick(evt) {
		evt.preventDefault();

		if (
			evt.target.getAttribute('data-cart-back') === 'delivery' &&
			this.popupWrapper.classList.contains(ClassName.OPENED_PAY)
		) {
			this.openDelivery();
		} else {
			this.openDefault();
		}
	}
	onPayButtonClick(evt) {
		evt.preventDefault();

		if (this.cart.classList.contains('_shop')) {
			const registerForm = this.cart.querySelector(
				'.cart__delivery-content._shop .cart-delivery__register-form'
			);
			const registerFormInputs = registerForm.querySelectorAll('[data-validate-type] input');
			showInputsError(registerFormInputs);

			const deliveryForm = this.cart.querySelector(
				'.delivery-address__section._courier:not(._hidden)'
			);

			if (deliveryForm) {
				const deliveryFormInputs = deliveryForm.querySelectorAll('[data-validate-type] input');
				showInputsError(deliveryFormInputs);
			}

			const registerFormInvalidInput = registerForm.querySelector(
				'[data-validate-type].is-invalid'
			);

			let deliveryFormInvalidInput;

			if (deliveryForm) {
				deliveryFormInvalidInput = deliveryForm.querySelector('[data-validate-type].is-invalid');
			}

			if (registerFormInvalidInput) {
				registerFormInvalidInput && registerFormInvalidInput.querySelector('input').focus();
			} else if (deliveryFormInvalidInput) {
				deliveryFormInvalidInput && deliveryFormInvalidInput.querySelector('input').focus();
			} else {
				this.openPay();
			}
		}
	}
	onRentSubmitButtonClick(evt) {
		evt.preventDefault();

		if (this.cart.classList.contains('_rent')) {
			const registerForm = this.cart.querySelector(
				'.cart__delivery-content._rent .cart-delivery__register-form'
			);
			const registerFormInputs = registerForm.querySelectorAll('[data-validate-type] input');
			showInputsError(registerFormInputs);

			const registerFormInvalidInput = registerForm.querySelector(
				'[data-validate-type].is-invalid'
			);

			if (registerFormInvalidInput) {
				registerFormInvalidInput && registerFormInvalidInput.querySelector('input').focus();
			} else {
				Popups.open('cart-reservation');
			}
		}
	}
	onShopButtonClick() {
		this.container.classList.remove('_rent');
		this.container.classList.add('_shop');
	}
	onRentButtonClick() {
		this.container.classList.remove('_shop');
		this.container.classList.add('_rent');
	}
	openDelivery() {
		this.popup.scrollTo(0, 0);
		this.popupWrapper.classList.add(ClassName.ANIMATION);
		if (this.popupWrapper.classList.contains(ClassName.OPENED_PAY)) {
			this.popupWrapper.classList.remove(ClassName.OPENED_PAY);
			this.popupWrapper.classList.remove(ClassName.ANIMATION);
		} else {
			this.popupWrapper.classList.add(ClassName.OPENED_DELIVERY);
			gsap.to(this.popupWrapper, {
				width: '100%',
				duration: 0.3,
				onComplete: () => {
					this.popupWrapper.classList.remove(ClassName.ANIMATION);
				},
			});
			const authContainers = document.querySelectorAll('[data-delivery-auth]');
			authContainers.forEach(container => (container.auth = new DeliveryAuth(container)));
		}
	}
	openDefault() {
		this.popup.scrollTo(0, 0);
		this.popupWrapper.classList.add(ClassName.ANIMATION);

		if (window.innerWidth > TABLET_BREAKPOINT) {
			gsap.to(this.popupWrapper, {
				width: '50%',
				duration: 0.3,
				onComplete: () => {
					this.popupWrapper.classList.remove(ClassName.OPENED_DELIVERY);
					this.popupWrapper.classList.remove(ClassName.OPENED_PAY);
					this.popupWrapper.classList.remove(ClassName.ANIMATION);
				},
			});
		} else {
			this.popupWrapper.classList.remove(ClassName.OPENED_DELIVERY);
			this.popupWrapper.classList.remove(ClassName.OPENED_PAY);
			this.popupWrapper.classList.remove(ClassName.ANIMATION);
		}
	}
	openPay() {
		this.popup.scrollTo(0, 0);
		this.popupWrapper.classList.add(ClassName.ANIMATION);
		this.popupWrapper.classList.add(ClassName.OPENED_PAY);

		clearTimeout(this.animTO);
		this.animTO = setTimeout(() => this.popupWrapper.classList.remove(ClassName.ANIMATION), 300);
	}
	onLegalCheckboxChange(e) {
		const legalBlock = e.target.parentNode.parentNode.querySelector('[data-legal-block]');
		if (legalBlock) {
			legalBlock.classList.toggle(ClassName.HIDDEN);
		}
	}
	onAuthBtnClick(e) {
		e.preventDefault();
		this.authBlock.classList.remove('_profile');
		this.authBlock.classList.remove('_edit');
		this.authBlock.classList.add('_auth');
	}
	onAuthBtnChangeClick(e) {
		e.preventDefault();

		this.authBlock.classList.toggle('_email');
		const authContainer = e.target.closest('[data-delivery-auth]');
		if (authContainer) {
			authContainer.auth.setAuthFormState('default');
		}
	}
	onEditProfileDataBtnClick(e) {
		e.preventDefault();
		this.authBlock.classList.remove(ClassName.PROFILE);
		this.authBlock.classList.remove(ClassName.AUTH);
		this.authBlock.classList.add(ClassName.EDIT);
	}
	onSubmitAuthBtnClick(e) {
		e.preventDefault();
		const btn = e.target;
		const input = btn.parentElement.querySelector('input');
		if (input.getAttribute('aria-invalid') === 'true') {
			input.focus();
			return;
		}
		if (btn.classList.contains('_tel')) {
			console.log('contains tel');
			this.authBlock.classList.add(ClassName.SMS);
			return;
		}
		const form = btn.closest('form');
		form.reset();
		form.querySelectorAll('input').forEach(i => i.setAttribute('aria-invalid', true));
		this.authBlock.classList.remove(ClassName.EDIT);
		this.authBlock.classList.remove(ClassName.AUTH);
		this.authBlock.classList.remove(ClassName.SMS);
		this.authBlock.classList.add(ClassName.PROFILE);
	}
	onSubmitSmsAuthBtnClick(e) {
		e.preventDefault();
		const btn = e.target;
		const form = btn.closest('form');
		form.reset();
		form.querySelectorAll('input').forEach(i => i.setAttribute('aria-invalid', true));
		this.authBlock.classList.remove(ClassName.EDIT);
		this.authBlock.classList.remove(ClassName.AUTH);
		this.authBlock.classList.remove(ClassName.SMS);
		this.authBlock.classList.add(ClassName.PROFILE);
	}
	onNextButtonClick(e) {
		const button = e.target;
		const targetId = button.getAttribute('data-cart-next');
		const targetBlock = this.container.querySelector(`#${targetId}`) || this.orderButton;
		const yPos = targetBlock.getBoundingClientRect().top;
		const headerHeight = this.header.offsetHeight;
		const buttonHeight = button.offsetHeight;
		const scrollOffset = yPos - headerHeight - buttonHeight - 16;
		const currentBlock = e.target.closest('.cart__block');

		currentBlock.classList.add(`_${ClassName.COMPLETE}`);
		targetBlock.classList.remove(`_${ClassName.HIDDEN}`);
		button.classList.add(`_${ClassName.HIDDEN}`);

		const blocks = this.container.querySelectorAll('.cart__block');
		const isAllComplete = Array(...blocks).every(block =>
			block.classList.contains(`_${ClassName.COMPLETE}`)
		);

		if (isAllComplete) {
			this.orderButton.classList.remove(`_${ClassName.HIDDEN}`);
		}
		if (!targetBlock.classList.contains(`_${ClassName.COMPLETE}`)) {
			this.currentUncompleteBlock = targetBlock;
		}

		const uncompleteBlockNextBtn = this.currentUncompleteBlock.querySelector('[data-cart-next]');

		if (uncompleteBlockNextBtn) {
			uncompleteBlockNextBtn.classList.remove(`_${ClassName.HIDDEN}`);
		}

		if (window.innerWidth > 768) {
			this.deliverySection.scrollBy({
				top: scrollOffset,
				left: 0,
			});
		} else {
			this.popup.scrollBy({
				top: scrollOffset,
				left: 0,
				behavior: 'smooth',
			});
		}
	}
	onEditDataButtonClick(e) {
		e.preventDefault();
		const currentBlock = e.target.closest('.cart__block');
		const nextBtn = currentBlock.querySelector('[data-cart-next]');
		currentBlock.classList.remove(`_${ClassName.COMPLETE}`);
		this.orderButton.classList.add(`_${ClassName.HIDDEN}`);
		this.nextButtons.forEach(btn => {
			btn.classList.add(`_${ClassName.HIDDEN}`);
		});
		nextBtn.classList.remove(`_${ClassName.HIDDEN}`);
	}
}

export default new Cart();
