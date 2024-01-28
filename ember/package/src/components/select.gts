import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import { on } from '@ember/modifier';

import styles from '@hokulea/core/controls.module.css';

import type { TOC } from '@ember/component/template-only';
import type { WithBoundArgs } from '@glint/template';

export type Value = string | number;

export interface OptionSignature {
  Element: HTMLOptionElement;
  Args: {
    value: Value;
    isSelected: (option: Value) => boolean;
  };
  Blocks: {
    default: [];
  };
}

const Option: TOC<OptionSignature> = <template>
  <option value={{@value}} selected={{@isSelected @value}} ...attributes>
    {{#if (has-block)}}
      {{yield}}
    {{else}}
      {{@value}}
    {{/if}}
  </option>
</template>;

export interface SelectSignature {
  Element: HTMLSelectElement;
  Args: {
    value?: Value | Value[];
    update?: (value: Value | Value[]) => void;
    disabled?: boolean;
  };
  Blocks: {
    default: [
      {
        Option: WithBoundArgs<typeof Option, 'isSelected'>;
      }
    ];
  };
}

export default class Select extends Component<SelectSignature> {
  isSelected = (option: Value) => {
    if (Array.isArray(this.args.value)) {
      return this.args.value.includes(option);
    }

    return String(option) === String(this.args.value);
  };

  select = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    const selection = Array.of(...select.selectedOptions).map((option) => option.value);
    const value = selection.length === 1 ? selection[0] : selection;

    this.args.update?.(value);
  };

  <template>
    <select
      class={{styles.select}}
      disabled={{@disabled}}
      data-test-select
      ...attributes
      {{on 'input' this.select}}
    >
      {{yield (hash Option=(component Option isSelected=this.isSelected))}}
    </select>
  </template>
}
