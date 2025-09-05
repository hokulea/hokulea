import type { ShapeArgs } from '../../-private/shapes.ts';

export type InputArgs<T> = ShapeArgs & {
  value?: T;
  update?: (value: T) => void;
  disabled?: boolean;
};

export const pickAsNumber = (update?: (value: number) => void) => (value: string) => {
  const numeric = Number.parseFloat(value);

  if (update) {
    update(numeric);
  }
};
