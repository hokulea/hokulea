import Component from '@glimmer/component';

import styles from '@hokulea/core/forms.module.css';

import { Icon } from '../graphics/icon.gts';

import type Owner from '@ember/owner';
import type { WithBoundArgs } from '@glint/template';
import type { Issue } from '@hokulea/ember-pahu';

const ErrorIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="256"
height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M208.49
191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51
64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145
128Z"/></svg>`;
const ValidIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="256"
height="256" viewBox="0 0 256 256"><path fill="currentColor" d="m232.49
80.49l-128 128a12 12 0 0 1-17 0l-56-56a12 12 0 1 1 17-17L96 183L215.51 63.51a12
12 0 0 1 17 17Z"/></svg>`;

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
    <p data-test-rule data-test-rule-invalid={{(this.isInvalid)}}>
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

export class Rules extends Component<RulesSignature> {
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
