// import { modifier } from 'ember-modifier';
import Modifier from 'ember-modifier';

import type { FormData, FormKey, UserData } from '../';

export interface NamedOptions<DATA extends UserData> {
  /** @internal */
  invalid: boolean;

  /** @internal */
  errorMessageId: string;

  /** @internal */
  showErrorsFor: (field: FormKey<FormData<DATA>>) => boolean;

  /** @internal */
  name: FormKey<FormData<DATA>>;
}

type ValidationElements =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | HTMLDivElement;

export interface ManagaValidationSignature<DATA extends UserData> {
  Element: ValidationElements;
  Args: {
    Named: NamedOptions<DATA>;
  };
}

export default class ManageValidationModifier<DATA extends UserData> extends Modifier<
  ManagaValidationSignature<DATA>
> {
  modify(
    element: HTMLInputElement,
    _pos: [],
    { name, showErrorsFor, invalid, errorMessageId }: NamedOptions<DATA>
  ) {
    if (showErrorsFor(name)) {
      element.ariaInvalid = invalid ? 'true' : 'false';

      if (invalid) {
        element.setAttribute('aria-errormessage', errorMessageId);
      } else {
        element.removeAttribute('aria-errormessage');
      }

      if (element.parentElement && 'inputBuilder' in element.parentElement.dataset) {
        element.parentElement.dataset.invalid = invalid ? 'true' : 'false';
      }
    }

    return;
  }
}
