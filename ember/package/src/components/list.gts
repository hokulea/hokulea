import Component from '@glimmer/component';

// import { hash } from '@ember/helper';
import { listbox } from 'ember-aria-navigator';

import styles from '@hokulea/core/controls.module.css';

// import type { WithBoundArgs } from '@glint/template';

export interface OptionSignature<V> {
  Element: HTMLOptionElement;
  Args: {
    value: V;
  };
  Blocks: {
    default: [value: V];
  };
}

class Option<V> extends Component<OptionSignature<V>> {
  <template>
    <span role='option'>
      {{yield @value}}
    </span>
  </template>
}

export interface ListSignature<V> {
  Element: HTMLDivElement;
  Args: {
    items: V[];
    value?: V | V[];
    update?: (value: V | V[]) => void;
    disabled?: boolean;
  };
  Blocks: {
    default: [item: V];
  };
}

export default class List<V> extends Component<ListSignature<V>> {
  Option = Option<V>;
  // isSelected = (option: V) => {
  //   if (Array.isArray(this.args.value)) {
  //     return this.args.value.includes(option);
  //   }

  //   return String(option) === String(this.args.value);
  // };

  // select = (event: Event) => {
  //   const select = event.target as HTMLSelectElement;
  //   const selection = Array.of(...select.selectedOptions).map((option) => option.value);
  //   const value = selection.length === 1 ? selection[0] : selection;

  //   this.args.update?.(value);
  // };

  <template>
    <div class={{styles.list}} disabled={{@disabled}} data-test-select
    ...attributes {{listbox}}>
      {{#each @items as |item|}}
        <Option @value={{item}}>{{yield item}}</Option>
      {{/each}}
    </div>
  </template>
}
