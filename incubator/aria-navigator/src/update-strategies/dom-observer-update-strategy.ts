import { isItemOf } from '../controls/-utils';
import { type Control } from '../controls/control';

import type { UpdateStrategy } from './update-strategy';

// function verbose(o: object) {
//   const r = {};

//   for (const p in o) {
//     r[p] = o[p];
//   }

//   return r;
// }

export class DomObserverUpdateStrategy implements UpdateStrategy {
  private observer: MutationObserver = new MutationObserver((changes) => {
    if (!this.control) {
      return;
    }

    const changedItems = changes.every((change) => change.type === 'childList');

    // console.log(changes.map(verbose));

    const itemAttributes = ['aria-disabled'];
    const changedItemAttributes = changes.some(
      (change) =>
        change.type === 'attributes' &&
        isItemOf(change.target as HTMLElement, this.control as Control) &&
        itemAttributes.includes(change.attributeName as string)
    );

    if (changedItems || changedItemAttributes) {
      this.control.readItems();
    }

    const optionAttributes = [...this.control.optionAttributes, 'aria-disabled'];
    const changedOptions =
      changes.length === 1 &&
      changes[0].type === 'attributes' &&
      optionAttributes.includes(changes[0].attributeName as string);

    if (changedOptions) {
      this.control.readOptions();
    }

    const changedSelection = changes.every(
      (c) => c.type === 'attributes' && c.attributeName === 'aria-selected'
    );

    if (changedSelection) {
      this.control.readSelection();
    }
  });

  constructor(private control?: Control) {
    this.observe();
  }

  private observe() {
    if (!this.control) {
      return;
    }

    this.observer.observe(this.control.element, {
      subtree: true,
      childList: true,
      attributes: true
    });
  }

  setControl(control: Control) {
    this.observer.disconnect();
    this.control = control;
    this.observe();
  }

  teardown() {
    this.observer.disconnect();
  }
}
