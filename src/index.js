import {modal} from './components/modal/modal';
import {veil} from './components/veil/veil';

import ModalModel from './components/modal/modal-model';
import VeilModel from './components/veil/veil-model';

require('./styles/main.scss');

class IndexPage {
  constructor() {
    // dom elements
    this.modalButton = document.getElementById('showModalButton');

    // event/signals handlers
    this.modalButton.addEventListener('click', this.onButtonClicked);
    ModalModel.dismissalRequested.add(this.onDismissalRequested, this);
    VeilModel.dismissalRequested.add(this.onDismissalRequested, this);
  }

  onButtonClicked() {
    // add class to prevent scrolling
    document.body.classList.add('has-veil');

    VeilModel.requestDisplay();
    ModalModel.requestDisplay();
  }

  onDismissalRequested() {
    // remove class to allow scrolling
    document.body.classList.remove('has-veil');

    ModalModel.requestDismissal();
    VeilModel.requestDismissal();

    this.modalButton.focus();
  }
}

let page = new IndexPage();
