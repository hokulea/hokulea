import type {
  FieldElement,
  FieldValidationResponse,
  Issue,
  PathSegment,
  ValidationResponse
} from './definitions';
import type { StandardSchemaV1 } from '@standard-schema/spec';

export function validateNativeField(element: FieldElement): ValidationResponse {
  if (element.validity.valid) {
    return;
  }

  return {
    path: [element.name],
    message: element.validationMessage
  };
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

export function normalizePathSegment(segment: PropertyKey | PathSegment): PropertyKey {
  return typeof segment === 'object' ? segment.key : segment;
}

export function transformSchemaPath(
  path: (PropertyKey | PathSegment)[] | undefined
): string | undefined {
  return path === undefined
    ? undefined
    : path
        .map((segment) => normalizePathSegment(segment))
        .map((segment) => {
          return typeof segment === 'number' ? `[${segment}]` : segment;
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
