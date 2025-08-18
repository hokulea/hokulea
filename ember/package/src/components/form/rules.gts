import Component from '@glimmer/component';

import styles from '@hokulea/core/forms.module.css';

import Icon from '../icon.gts';

import type Owner from '@ember/owner';
import type { WithBoundArgs } from '@glint/template';
import type { Issue } from '@hokulea/pahu';

const ErrorIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="256"
height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M165.66
101.66L139.31 128l26.35 26.34a8 8 0 0 1-11.32 11.32L128 139.31l-26.34 26.35a8 8
0 0 1-11.32-11.32L116.69 128l-26.35-26.34a8 8 0 0 1 11.32-11.32L128
116.69l26.34-26.35a8 8 0 0 1 11.32 11.32M232 128A104 104 0 1 1 128 24a104.11
104.11 0 0 1 104 104m-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88"/></svg>`;
const ValidIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="256"
height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M173.66 98.34a8
8 0 0 1 0 11.32l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112
148.69l50.34-50.35a8 8 0 0 1 11.32 0M232 128A104 104 0 1 1 128 24a104.11 104.11
0 0 1 104 104m-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88"/></svg>`;

interface RuleSignature {
  Args: {
    key: string;
    value: unknown;
    errors?: Issue[];
  };
  Blocks: {
    default: [];
  };
}

class Rule extends Component<RuleSignature> {
  isInvalid = () => {
    return this.args.errors?.some(
      (i) => this.args.key in i && i[this.args.key] === this.args.value
    );
  };

  <template>
    <p>
      <Icon
        @icon={{if (this.isInvalid) ErrorIcon ValidIcon}}
        data-invalid={{(this.isInvalid)}}
        data-icon
      />

      <span>{{yield}}</span>
    </p>
  </template>
}

export interface RulesBlock {
  rules: [WithBoundArgs<typeof Rule, 'errors'>];
}

export interface RulesSignature {
  Element: HTMLDivElement;
  Args: {
    useRules: (useRules: boolean) => void;

    /*
     * @internal
     */
    errors: Issue[];

    /*
     * @internal
     */
    id: string;
  };
  Blocks: {
    default: [WithBoundArgs<typeof Rule, 'errors'>];
  };
}

export default class Rules extends Component<RulesSignature> {
  constructor(owner: Owner, args: RulesSignature['Args']) {
    super(owner, args);

    args.useRules(true);
  }

  <template>
    <div id={{@id}} aria-live="assertive" class={{styles.rules}} ...attributes>
      {{yield (component Rule errors=@errors)}}
    </div>
  </template>
}
