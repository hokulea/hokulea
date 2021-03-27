import { SelectEmitter } from '../../../composites/selectable-composite';
import { SelectCompositeArgs } from '../../composite';
import EmitStrategy from './emit-strategy';

export default interface SelectEmitStrategy
  extends EmitStrategy<SelectCompositeArgs>,
    SelectEmitter {}
