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
 * Returns the type of all keys of DATA, that are also strings. Only strings can be used as field @name
 */
// export type KnownFormKey<DATA extends UserData> = keyof DATA & string;

// export type FullFormKey<DATA extends UserData> = KnownFormKey<DATA> | (string & {});

export type ValidationMode = 'input' | 'change' | 'focusout' | 'submit';

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
}

export type ValidationResponse = undefined | Issue | Issue[];
export type FieldValidationResponse = ValidationResponse | ErrorMessage | ErrorMessage[];

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

export type FieldElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement
  | HTMLButtonElement
  | HTMLFieldSetElement
  | HTMLObjectElement
  | HTMLOutputElement;
