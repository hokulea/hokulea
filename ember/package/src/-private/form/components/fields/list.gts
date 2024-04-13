import Component from '@glimmer/component';
import { uniqueId } from '@ember/helper';

import { element } from 'ember-element-helper';

import List from '../../../../components/list';
import Label from '../label';

import type { ListSignature } from '../../../../components/list';
import type { FormData, FormKey, UserData } from '../../';
import type { BoundField, FieldArgs } from '../field';
import type { TOC } from '@ember/component/template-only';

interface ListLabelSignature {
  Element: HTMLLabelElement;
  Args: {
    id: string;
  };
  Blocks: {
    default: [];
  };
}

const ListLabel: TOC<ListLabelSignature> = <template>
  <Label @element={{element 'span'}} id={{@id}}>{{yield}}</Label>
</template>;

export interface ListFieldSignature<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> {
  Element: ListSignature<DATA[KEY]>['Element'];
  Args: FieldArgs<DATA, KEY> &
    Omit<ListSignature<DATA[KEY]>['Args'], 'selection' | 'update'> & {
      Field: BoundField<DATA, KEY>;
    };
  Blocks: ListSignature<DATA[KEY]>['Blocks'];
}

export default class ListField<
  DATA extends UserData,
  KEY extends FormKey<FormData<DATA>> = FormKey<FormData<DATA>>
> extends Component<ListFieldSignature<DATA, KEY>> {
  Field = this.args.Field;
  List = List<DATA[KEY]>;

  setValue = (setValue: (value: DATA[KEY]) => void) => {
    return (value: DATA[KEY] | DATA[KEY][]) => setValue(value as DATA[KEY]);
  };

  asValue = (value: unknown) => value as DATA[KEY];

  <template>
    {{#let (uniqueId) as |labelId|}}
      <this.Field
        @name={{@name}}
        @label={{@label}}
        @labelComponent={{component ListLabel id=labelId}}
        @description={{@description}}
        @validate={{@validate}}
        as |f|
      >
        <this.List
          @value={{this.asValue f.value}}
          @update={{this.setValue f.setValue}}
          @disabled={{@disabled}}
          name={{@name}}
          aria-labelledby={{labelId}}
          {{f.manageValidation}}
          {{f.captureEvents}}
          ...attributes
          as |s|
        >
          {{yield s}}
        </this.List>
      </this.Field>
    {{/let}}
  </template>
}
