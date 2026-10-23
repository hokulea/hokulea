import { assert } from '@ember/debug';

import { modifier } from 'ember-modifier';

export interface DisabledSignature {
  Element: HTMLElement;
  Args: {
    Positional: never[];
    Named: {
      when: boolean;
    };
  };
}

const disabled = modifier<DisabledSignature>((element, _, { when: whenDisabled }) => {
  assert('disabled modifier requires boolean `when` argument', typeof whenDisabled === 'boolean');

  element.setAttribute('aria-disabled', whenDisabled ? 'true' : 'false');

  // hotfix:
  element.toggleAttribute('disabled', whenDisabled);

  if (whenDisabled) {
    const stopEvent = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      return false;
    };

    element.addEventListener('click', stopEvent);

    return () => element.removeEventListener('click', stopEvent);
  }

  // No teardown necessary in this case!
  return;
});

export default disabled;
