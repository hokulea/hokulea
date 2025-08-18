import { modifier } from 'ember-modifier';

export interface NamedOptions {
  /** @internal */
  invalid: boolean;

  /** @internal */
  errorMessageId: string;

  /** @internal */
  showErrors?: boolean;
}

type ValidationElements =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | HTMLDivElement;

// export interface ManagaValidationSignature {
//   Element: ValidationElements;
//   Args: {
//     Named: NamedOptions;
//   };
// }

// export default class ManageValidationModifier extends Modifier<ManagaValidationSignature> {
//   modify(
//     element: HTMLInputElement,
//     _pos: [],
//     { showErrors, invalid, errorMessageId }: NamedOptions
//   ) {
//     if (showErrors) {
//       element.ariaInvalid = invalid ? 'true' : 'false';

//       if (invalid) {
//         element.setAttribute('aria-errormessage', errorMessageId);
//       } else {
//         element.removeAttribute('aria-errormessage');
//       }

//       if (element.parentElement && 'inputBuilder' in element.parentElement.dataset) {
//         element.parentElement.dataset.invalid = invalid ? 'true' : 'false';
//       }
//     }

//     return;
//   }
// }

export const manageValidation = modifier(
  (element: ValidationElements, _: [], { showErrors, invalid, errorMessageId }: NamedOptions) => {
    if (showErrors !== false) {
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
);
