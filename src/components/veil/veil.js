import VeilModel from './veil-model.js';

class Veil {
  constructor() {
    // dom elements
    this.element = document.getElementById('veil');

    // event/signals handlers
    this.element.addEventListener('click', this.onClicked.bind(this));
    document.addEventListener('keydown', this.onKeyPressed.bind(this));
    VeilModel.dismissalRequested.add(this.onDismissalRequested, this);
    VeilModel.displayRequested.add(this.onDisplayRequested, this);
  }

  onClicked() {
    VeilModel.requestDismissal();
  }

  onDismissalRequested() {
    this.element.classList.add('hidden');
  }

  onDisplayRequested() {
    this.element.classList.remove('hidden');
  }

  onKeyPressed(event) {
    // exit if veil not visible
    if (!VeilModel.isVisible) {
      return;
    }

    // exit if not esc
    if (event.keyCode !== 27) {
      return;
    }

    VeilModel.requestDismissal();
  }
}

export let veil = new Veil();
