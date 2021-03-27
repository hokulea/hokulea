import { CompositeElement } from '../../../composites/composite';
import SelectableComposite, {
  SelectEmitter
} from '../../../composites/selectable-composite';
import { SelectCompositeArgs } from '../../composite';
import IndexEmitStrategy from './index-emit-strategy';
import { getSelectionIndices } from './selection';

export default class SelectIndexEmitStrategy
  extends IndexEmitStrategy<SelectCompositeArgs, SelectableComposite>
  implements SelectEmitter {
  select(selection: CompositeElement[]): void {
    const indices = getSelectionIndices(this.composite.elements, selection);
    this.args.select?.(indices);
  }
}
