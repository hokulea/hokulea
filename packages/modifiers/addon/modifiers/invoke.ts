import Modifier from 'ember-class-based-modifier';
import { action } from '@ember/object';

interface InvokeArgs {
  positional: [() => void],
  named: {}
}

export default class InvokeModifier extends Modifier<InvokeArgs> {
  private mouseEvent: MouseEvent;
  private touchEvent: TouchEvent;

  get action() {
    return this.args.positional[0];
  }

  didInstall() {
    if (this.element) {
      window.addEventListener('mousedown', this.handleMouseStart, false);
      this.element.addEventListener('mouseup', this.handleMouseEnd, false);
      window.addEventListener('touchstart', this.handleTouchStart, false);
      this.element.addEventListener('touchend', this.handleTouchEnd, false);
      this.element.addEventListener('keydown', this.handleKeyboard, false);
      this.element.setAttribute('tabindex', '0');
    }
  }

  willInstall() {
    if (this.element) {
      window.removeEventListener('mousedown', this.handleMouseStart);
      this.element.removeEventListener('mouseup', this.handleMouseEnd);
      window.removeEventListener('touchstart', this.handleTouchStart);
      this.element.removeEventListener('touchend', this.handleTouchEnd);
      this.element.removeEventListener('keydown', this.handleKeyboard);
    }
  }

  @action
  handleMouseStart(event: MouseEvent) {
    this.mouseEvent = event;
  }

  @action
  handleMouseEnd(event: MouseEvent) {
    if (this.mouseEvent.target === event.target) {
      console.log('mouse', this.mouseEvent === event, event);
      this.invoke();
    }
  }

  @action
  handleTouchStart(event: TouchEvent) {
    this.touchEvent = event;
  }

  @action
  handleTouchEnd(event: TouchEvent) {
    if (this.touchEvent.target === event.target) {
      this.invoke();
    }
  }

  @action
  handleKeyboard(event: KeyboardEvent) {
    console.log('handlekeyboard', event);

    if (event.key === 'Enter' || event.key === ' ') {
      this.invoke();
    }
  }

  private invoke() {
    if (this.action) {
      this.action();
    }
  }
}
