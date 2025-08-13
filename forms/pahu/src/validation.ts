import type {
  FieldElement,
  FieldValidationResponse,
  Issue,
  PathSegment,
  ValidationResponse
} from './definitions';
import type { StandardSchemaV1 } from '@standard-schema/spec';

function isFormFieldElement(el: Element): el is FieldElement {
  return (
    el instanceof HTMLInputElement ||
    el instanceof HTMLTextAreaElement ||
    el instanceof HTMLSelectElement ||
    el instanceof HTMLButtonElement ||
    el instanceof HTMLFieldSetElement ||
    el instanceof HTMLObjectElement ||
    el instanceof HTMLOutputElement
  );
}

export function validateNativeField(element: FieldElement): ValidationResponse {
  if (element.validity.valid) {
    return;
  }

  return {
    path: [element.name],
    message: element.validationMessage
  };
}

export function validateNativeForm(form: HTMLFormElement): ValidationResponse {
  if (form.checkValidity()) {
    return;
  }

  const issues: Issue[] = [];

  for (const el of form.elements) {
    if (isFormFieldElement(el)) {
      const issue = validateNativeField(el) as Issue | undefined;

      if (issue) {
        issues.push(issue);
      }
    }
  }

  return issues;
}

export function isValidationSchema(schema: unknown): schema is StandardSchemaV1 {
  return (
    schema !== undefined &&
    typeof schema === 'object' &&
    (schema as Partial<StandardSchemaV1>)['~standard'] !== undefined
  );
}

export async function validateSchema(
  data: unknown,
  schema: StandardSchemaV1
): Promise<StandardSchemaV1.Result<unknown>> {
  return await schema['~standard'].validate(data);
}

export function transformSchemaPath(
  path: (PropertyKey | PathSegment)[] | undefined
): string | undefined {
  return path === undefined
    ? undefined
    : path
        .map((segment) => {
          const normalizedSegment = typeof segment === 'object' ? segment.key : segment;

          return typeof normalizedSegment === 'number'
            ? `[${normalizedSegment}]`
            : normalizedSegment;
        })
        .join('.')
        .replaceAll('.[', '[');
}

export function transformValidationResponse(response: FieldValidationResponse): Issue[] {
  const responses = Array.isArray(response) ? response : [response];

  const issues = responses
    .filter((r) => r !== undefined)
    .map((r): Issue => {
      if (typeof r === 'string') {
        return {
          message: r
        };
      }

      return r;
    });

  return issues;
}
