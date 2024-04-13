import Component from '@glimmer/component';

import styles from '@hokulea/core/forms.module.css';

// import Icon from '../../../components/icon';
import type { ValidationError } from '../';

export interface ErrorsSignature<VALUE> {
  Element: HTMLDivElement;
  Args: {
    // the following are private arguments curried by the component helper, so users will never have to use those

    /*
     * @internal
     */
    errors: ValidationError<VALUE>[];

    /*
     * @internal
     */
    id: string;
  };
  Blocks: {
    default?: [ValidationError<VALUE>[]];
  };
}

export default class Errors<VALUE> extends Component<ErrorsSignature<VALUE>> {
  <template>
    <div id={{@id}} aria-live='assertive' class={{styles.errors}} ...attributes>
      {{! <span><Icon @icon='dismiss-circle' @style='filled' /></span> }}
      {{#if (has-block)}}
        {{yield @errors}}
      {{else}}
        <div>
          {{#each @errors as |e|}}
            {{#if e.message}}
              <p
                data-test-error
                data-test-error-type='{{e.type}}'
                data-test-error-value='{{e.value}}'
              >{{e.message}}</p>
            {{/if}}
          {{/each}}
        </div>
      {{/if}}
    </div>
  </template>
}
