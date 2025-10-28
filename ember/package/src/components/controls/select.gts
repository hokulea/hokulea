import Component from '@glimmer/component';
import { hash } from '@ember/helper';
import { on } from '@ember/modifier';

import type { TOC } from '@ember/component/template-only';
import type { WithBoundArgs } from '@glint/template';
import type { Spacing } from '@hokulea/tokens';

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
    spacing?: Spacing;
  };
  Blocks: {
    default: [
      {
        Option: WithBoundArgs<typeof Option, 'isSelected'>;
      }
    ];
  };
}

export class Select extends Component<SelectSignature> {
  isSelected = (option: Value) => {
    if (Array.isArray(this.args.value)) {
      return this.args.value.includes(option);
    }

    return String(option) === String(this.args.value);
  };

  select = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    const selection = Array.of(...select.selectedOptions).map((option) => option.value);
    const value = selection.length === 1 ? (selection[0] as Value) : (selection as Value[]);

    this.args.update?.(value);
  };

  get spacing() {
    return this.args.spacing ?? 1;
  }

  <template>
    <span class="select" data-spacing={{this.spacing}}>
      <select
        disabled={{@disabled}}
        data-test-select
        {{on "input" this.select capture=true}}
        ...attributes
      >
        {{yield (hash Option=(component Option isSelected=this.isSelected))}}
      </select>
    </span>
  </template>
}
