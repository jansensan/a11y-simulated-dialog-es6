import {modal} from './components/modal/modal';
import {veil} from './components/veil/veil';

import ModalModel from './components/modal/modal-model';
import VeilModel from './components/veil/veil-model';

require('./styles/main.scss');

class IndexPage {
  constructor() {
    // dom elements
    this.inlineModalButton = document.getElementById('showModalInlineButton');
    this.modalButton = document.getElementById('showModalButton');

    // event/signals handlers
    this.inlineModalButton.addEventListener('click', this.onInlineButtonClicked.bind(this));
    this.modalButton.addEventListener('click', this.onButtonClicked.bind(this));
    ModalModel.dismissalRequested.add(this.onDismissalRequested, this);
    VeilModel.dismissalRequested.add(this.onDismissalRequested, this);
  }

  displayModal() {
    // add class to prevent scrolling
    document.body.classList.add('has-veil');

    VeilModel.requestDisplay();
    ModalModel.requestDisplay();
  }

  onButtonClicked() {
    ModalModel.triggerElement = this.modalButton;
    this.displayModal();
  }

  onDismissalRequested() {
    // remove class to allow scrolling
    document.body.classList.remove('has-veil');

    ModalModel.requestDismissal();
    VeilModel.requestDismissal();

    ModalModel.triggerElement.focus();
  }

  onInlineButtonClicked() {
    ModalModel.triggerElement = this.inlineModalButton;
    this.displayModal();
  }
}

let page = new IndexPage();
