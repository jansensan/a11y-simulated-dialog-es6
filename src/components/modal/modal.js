import signals from 'signals';

import ModalModel from './modal-model.js';

class Modal {
  constructor() {
    // dom elements
    this.element = document.getElementById('modal');
    this.firstElement = document.getElementById('modalCancelButton');
    this.lastElement = document.getElementById('modalCloseButton');
    this.activeElement = null;

    // event/signals handlers
    this.lastElement.addEventListener('click', this.onCloseButtonClicked.bind(this));
    document.addEventListener('keydown', this.onKeyPressed.bind(this));
    ModalModel.dismissalRequested.add(this.onDismissalRequested, this);
    ModalModel.displayRequested.add(this.onDisplayRequested, this);
  }

  onCloseButtonClicked() {
    ModalModel.requestDismissal();
  }

  onDismissalRequested() {
    // set aria-hidden for accessibility
    this.element.setAttribute('aria-hidden', true);

    // add class to hide modal
    this.element.classList.add('hidden');
  }

  onDisplayRequested() {
    // set aria-hidden for accessibility
    this.element.setAttribute('aria-hidden', false);

    // remove class that hides modal
    this.element.classList.remove('hidden');

    // set focus to modal element
    this.element.focus();
    this.updateActiveElement();
  }

  onKeyPressed(event) {
    // exit if modal not visible
    if (!ModalModel.isVisible) {
      return;
    }

    // exit if not tab
    if (event.keyCode !== 9) {
      return;
    }

    if (!event.shiftKey) {
      // tabbing forwards
      if (this.activeElement === this.lastElement) {
        event.preventDefault();
        event.stopPropagation();
        this.element.focus();
      }

    } else {
      // tabbing backwards
      if (this.activeElement === this.firstElement) {
        event.preventDefault();
        event.stopPropagation();
        this.element.focus();

      } else if (this.activeElement === this.element) {
        event.preventDefault();
        event.stopPropagation();
        this.lastElement.focus();
      }
    }

    this.updateActiveElement();
  }

  updateActiveElement() {
    // hack:
    // document.activeElement is not set as soon as focus is set,
    // a minimal delay is required, hence the use of setTimeout.
    setTimeout(() => {
      this.activeElement = document.activeElement;
    });
  }
}

export let modal = new Modal();
