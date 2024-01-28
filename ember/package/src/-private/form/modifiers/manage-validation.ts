// import { modifier } from 'ember-modifier';
import Modifier from 'ember-modifier';

import type { FormData, FormKey, UserData } from '../';

export interface NamedOptions<DATA extends UserData> {
  /*
   * @internal
   */
  invalid: boolean;

  /*
   * @internal
   */
  errorMessageId: string;

  /*
   * @internal
   */
  showErrorsFor: (field: FormKey<FormData<DATA>>) => boolean;

  /**
   * @internal
   */
  name: FormKey<FormData<DATA>>;
}

export interface ManagaValidationSignature<DATA extends UserData> {
  Element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  Args: {
    Named: NamedOptions<DATA>;
  };
}

// import Modifier from 'ember-modifier';
// import { renderToCanvas, VertexArray, RenderOptions } from 'neat-webgl-library';

// type Positional = [model: VertexArray];

// export interface Render3DModelSignature {
//   Element: HTMLCanvasElement;
//   Args: {
//     Positional: Positional;
//     Named: RenderOptions;
//   };
// }

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
        element.parentElement.setAttribute('data-invalid', invalid ? 'true' : 'false');
      }
    }

    return undefined;
  }
}

// const ManageValidationModifier = modifier<ManagaValidationSignature<DATA>>(
//   (element, _pos, { invalid, errorMessageId }) => {
//     element.ariaInvalid = invalid ? 'true' : 'false';

//     if (invalid) {
//       element.setAttribute('aria-errormessage', errorMessageId);
//     } else {
//       element.removeAttribute('aria-errormessage');
//     }

//     if (element.parentElement && 'inputBuilder' in element.parentElement.dataset) {
//       element.parentElement.setAttribute('data-invalid', invalid ? 'true' : 'false');
//     }

//     return undefined;
//   }
// );

// export default ManageValidationModifier;
