import { Menu, ReactiveUpdateStrategy } from 'aria-navigator';
import Modifier from 'ember-modifier';
import isEqual from 'lodash.isequal';

import type { EmitStrategy } from 'aria-navigator';
import type { NamedArgs, PositionalArgs } from 'ember-modifier';

export interface MenuSignature<T> {
  Element: HTMLElement;
  Args: {
    Positional: [];
    Named: {
      items?: T[];
      disabled?: boolean;
    };
  };
}
export default class MenuModifier<T> extends Modifier<MenuSignature<T>> {
  private menu?: Menu;
  private declare updater: ReactiveUpdateStrategy;
  private declare emitter: EmitStrategy;

  private prevItems?: T[];
  private prevDisabled?: boolean;

  modify(
    element: Element,
    _: PositionalArgs<MenuSignature<T>>,
    options: NamedArgs<MenuSignature<T>>
  ) {
    if (!this.menu) {
      this.updater = new ReactiveUpdateStrategy();

      this.menu = new Menu(element as HTMLElement, {
        updater: this.updater
      });
    }

    if (options.items && !isEqual(this.prevItems, options.items)) {
      this.updater.updateItems();
      this.prevItems = [...options.items];
    }

    let optionsChanged = false;

    if (this.prevDisabled !== options.disabled) {
      if (options.disabled) {
        element.setAttribute('aria-disabled', 'true');
      } else {
        element.removeAttribute('aria-disabled');
      }

      optionsChanged = true;

      this.prevDisabled = options.disabled;
    }

    if (optionsChanged) {
      this.updater.updateOptions();
    }
  }
}
