import styles from '@hokulea/core/forms.module.css';

import type { TOC } from '@ember/component/template-only';
// import Icon from '../../../components/icon';
import type { Issue } from '@hokulea/ember-pahu';

export interface ErrorsSignature {
  Element: HTMLDivElement;
  Args: {
    // the following are private arguments curried by the component helper, so users will never have to use those

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
    default?: [Issue[]];
  };
}

const Errors: TOC<ErrorsSignature> = <template>
  <div id={{@id}} aria-live="assertive" class={{styles.errors}} ...attributes>
    {{! <span><Icon @icon='dismiss-circle' @style='filled' /></span> }}
    {{#if (has-block)}}
      {{yield @errors}}
    {{else}}
      <div>
        {{#each @errors as |e|}}
          {{#if e.message}}
            <p
              data-test-error
              data-test-error-type="{{e.type}}"
              data-test-error-value="{{e.value}}"
            >{{e.message}}</p>
          {{/if}}
        {{/each}}
      </div>
    {{/if}}
  </div>
</template>;

export default Errors;
