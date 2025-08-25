import Component from '@glimmer/component';
import { uniqueId } from '@ember/helper';

import { element } from 'ember-element-helper';

import List from '../../list.gts';
import Label from '../label.gts';
import { manageValidation } from '../manage-validation.ts';

import type { ListSignature } from '../../list.gts';
import type { BoundField, FieldArgs } from '../field.gts';
import type { TOC } from '@ember/component/template-only';
import type { AttrValue } from '@glint/template';
import type { FieldNames, FieldValue, UserData } from '@hokulea/ember-pahu';

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
  <Label @element={{element "span"}} id={{@id}}>{{yield}}</Label>
</template>;

export interface ListFieldSignature<
  DATA extends UserData,
  NAME extends string = FieldNames<DATA> | (string & {}),
  VALUE = NAME extends keyof DATA ? DATA[NAME] : AttrValue
> {
  Element: ListSignature<FieldValue<DATA, NAME, VALUE>>['Element'];
  Args: FieldArgs<DATA, NAME, VALUE> &
    Omit<ListSignature<FieldValue<DATA, NAME, VALUE>>['Args'], 'selection' | 'update'> & {
      Field: BoundField<DATA, NAME, VALUE>;
    };
  Blocks: ListSignature<FieldValue<DATA, NAME, VALUE>>['Blocks'];
}

export default class ListField<
  DATA extends UserData,
  NAME extends string = FieldNames<DATA> | (string & {}),
  VALUE = NAME extends keyof DATA ? DATA[NAME] : AttrValue
> extends Component<ListFieldSignature<DATA, NAME, VALUE>> {
  Field = this.args.Field;
  List = List<FieldValue<DATA, NAME, VALUE>>;

  setValue = (setValue: (value: FieldValue<DATA, NAME, VALUE>) => void) => {
    return (value: FieldValue<DATA, NAME, VALUE> | FieldValue<DATA, NAME, VALUE>[]) =>
      setValue(value as FieldValue<DATA, NAME, VALUE>);
  };

  asValue = (value: unknown) => value as FieldValue<DATA, NAME, VALUE>;

  <template>
    {{#let (uniqueId) as |labelId|}}
      <this.Field
        @name={{@name}}
        @label={{@label}}
        @labelComponent={{component ListLabel id=labelId}}
        @description={{@description}}
        @value={{@value}}
        @ignoreNativeValidation={{@ignoreNativeValidation}}
        @validateOn={{@validateOn}}
        @revalidateOn={{@revalidateOn}}
        @validate={{@validate}}
        @validated={{@validated}}
        as |f|
      >
        <this.List
          @value={{this.asValue f.value}}
          @update={{this.setValue f.setValue}}
          @disabled={{@disabled}}
          {{!-- name={{@name}} --}}
          aria-labelledby={{labelId}}
          {{f.registerElement}}
          {{manageValidation errorMessageId=f.errorId invalid=f.invalid}}
          ...attributes
          as |s|
        >
          {{yield s}}
        </this.List>
      </this.Field>
    {{/let}}
  </template>
}
