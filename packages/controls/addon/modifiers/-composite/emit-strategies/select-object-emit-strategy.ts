import { CompositeElement } from '../../../composites/composite';
import SelectableComposite, {
  SelectEmitter
} from '../../../composites/selectable-composite';
import { SelectCompositeArgs } from '../../composite';
import ObjectEmitStrategy from './object-emit-strategy';
import { getSelectionIndices } from './selection';

export default class SelectObjectEmitStrategy
  extends ObjectEmitStrategy<SelectCompositeArgs, SelectableComposite>
  implements SelectEmitter {
  select(selection: CompositeElement[]): void {
    const indices = getSelectionIndices(this.composite.elements, selection);
    const items = indices.map(i => this.args.objects?.[i] ?? i);
    this.args.select?.(items);
  }
}
