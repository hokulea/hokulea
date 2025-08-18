/**
 * What the user can pass as @data
 */
export type UserData = object;
// export type UserData = Record<string, unknown>;

export type UserValue = unknown;

/**
 * Mapper type to construct subset of objects, whose keys are only strings (and not number or symbol)
 */
type OnlyStringKeys<T extends object> = Pick<T, keyof T & string>;

/**
 * The subset of properties of DATA, whose keys are strings (and not number or symbol)
 * Only this data is useable in the form
 */
export type FormData<DATA extends UserData = UserData> = OnlyStringKeys<DATA>;

/**
 * Events on which validation is happening or set it to 'off'
 */
export type ValidationMode = 'input' | 'change' | 'focusout' | 'submit' | 'off';

export const VALIDATION_EVENTS: ValidationMode[] = ['input', 'change', 'focusout', 'submit'];

export type ErrorMessage = string;

export interface PathSegment {
  /** The key representing a path segment. */
  key: PropertyKey;
}

export interface Issue {
  type?: string;
  message: ErrorMessage;
  path?: (PropertyKey | PathSegment)[] | undefined;
  [key: string]: unknown;
}

export type ValidationResponse = undefined | Issue | Issue[] | ErrorMessage | ErrorMessage[];

export type ValidationResultSuceess<Output = unknown> = {
  success: true;
  value: Output;
};

export type ValidationResultFailure<Output = unknown> = {
  success: false;
  value: Output;
  issues: Issue[];
};

export type ValidationResult<Output = unknown> =
  | ValidationResultFailure<Output>
  | ValidationResultSuceess<Output>;

export type ValidatedCallback = (event: ValidationMode | 'link', result: ValidationResult) => void;

export type FieldElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement
  | HTMLButtonElement
  | HTMLFieldSetElement
  | HTMLObjectElement
  | HTMLOutputElement;

/**
 * Give you all the names of a form in dot-notation
 *
 * The types here even get array based types with a number. You can see this
 * when hovering over the parameter for the `formName()` function below. It
 * doesn't though infer available items an that array and suggest the
 * appropriate indices
 *
 * Fixes welcome =)
 */
export type FieldNames<T> = T extends object
  ? {
      [Key in keyof T & (string | number)]: T[Key] extends object[]
        ? `${Key}[${number}].${FieldNames<T[Key]>}`
        : T extends object[]
          ? `${FieldNames<T[Key]>}`
          : T[Key] extends object
            ? `${Key}.${FieldNames<T[Key]>}`
            : `${Key}`;
    }[keyof T & (string | number)]
  : never;

// type tests for `FormNames<T>`

// type Profile = {
//   username: string;
//   profile: { givenName: string; familyName: string };
//   emails: { email: string; verified: boolean; primary: boolean }[];
// };

// type Test = FormNames<Profile>;

// function formName<DATA>(data: DATA, key: FormNames<DATA>) {}

// formName(
//   {
//     username: '',
//     profile: { givenName: '', familyName: '' },
//     emails: [
//       { email: 'a', verified: true, primary: true },
//       { email: '', verified: false, primary: false }
//     ]
//   },
//   ''
// );
