import { FocusManagementEmitter } from '@hokulea/controls/composites/features/focus-management-feature';
import { SelectionEmitter } from '@hokulea/controls/composites/features/selection-feature';

import { CompositeArgs } from '../../composite';

export default interface EmitStrategy<T = unknown>
  extends FocusManagementEmitter,
    SelectionEmitter {
  updateArguments(args: CompositeArgs<T>): void;
}
