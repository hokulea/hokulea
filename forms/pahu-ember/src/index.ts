import { modifier } from 'ember-modifier';
import { cell } from 'ember-resources';

import { createForm as upstreamCreateForm } from '@hokulea/pahu';

import type { AttrValue } from '@glint/template';
import type {
  FieldAPI as UpstreamFieldAPI,
  FieldConfig,
  FieldElement,
  FormAPI as UpstreamFormAPI,
  FormConfig,
  SignalFactory,
  UserData
} from '@hokulea/pahu';
import type { FunctionBasedModifier } from 'ember-modifier';

interface RegisterFormSignature {
  Element: HTMLFormElement;
  Args: {
    Positional: [];
    Named: object;
  };
}

interface RegisterFieldSignature {
  Element: FieldElement;
  Args: {
    Positional: [];
    Named: object;
  };
}

export type FieldAPI<DATA extends UserData, NAME extends string, VALUE> = {
  value: Exclude<VALUE, 'unknown'>;
  registerField: FunctionBasedModifier<RegisterFieldSignature>;
} & UpstreamFieldAPI<DATA, NAME, VALUE>;

export type FormAPI<DATA extends UserData = UserData> = {
  registerForm: FunctionBasedModifier<RegisterFormSignature>;

  createField<NAME extends string, VALUE = NAME extends keyof DATA ? DATA[NAME] : AttrValue>(
    config: FieldConfig<DATA, NAME, VALUE>
  ): FieldAPI<DATA, NAME, VALUE>;
} & UpstreamFormAPI<DATA>;

const signalFactory: SignalFactory = <T>(t?: T) => {
  const reactive = cell(t);

  return {
    get(): T {
      return reactive.current;
    },

    set(val: T) {
      reactive.set(val);
    }
  };
};

export function createForm<DATA extends UserData = UserData>(
  config: FormConfig<DATA> = {}
): FormAPI<DATA> {
  const form = upstreamCreateForm({
    ...config,
    subtle: { signalFactory }
  }) as unknown as FormAPI<DATA>;
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { createField } = form;

  form.registerForm = modifier<RegisterFormSignature>((element) => {
    form.subtle.registerElement(element);
  });

  form.createField = <
    NAME extends string,
    VALUE = NAME extends keyof DATA ? DATA[NAME] : AttrValue
  >(
    fieldConfig: FieldConfig<DATA, NAME, VALUE>
  ): FieldAPI<DATA, NAME, VALUE> => {
    const field = createField(fieldConfig) as unknown as FieldAPI<DATA, NAME, VALUE>;

    field.registerField = modifier<RegisterFieldSignature>((element) => {
      field.subtle.registerElement(element);
    });

    return field;
  };

  return form;
}
