import { SelectCompositeArgs } from '@hokulea/controls/modifiers/composite';

import { CompositeElement } from '../../../composites/composite';
import SelectEmitStrategy from './select-emit-strategy';

export default class NoopEmitStrategy implements SelectEmitStrategy {
  updateArguments(_args: SelectCompositeArgs<unknown>): void {
    // noop
  }

  select(_elements: CompositeElement[]): void {
    // noop
  }

  focus(_element: CompositeElement): void {
    // noop
  }
}
