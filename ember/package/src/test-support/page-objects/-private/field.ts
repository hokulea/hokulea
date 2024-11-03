import { PageObject, selector as sel } from 'fractal-page-object';

import { CheckboxPageObject } from '../choice';
import { InputPageObject } from '../input';
import { InputBuilderPageObject } from '../input-builder';
import { ListPageObject } from '../list';
import { SelectPageObject } from '../select';
import { TextAreaPageObject } from '../text-area';
import { ChoicesPageObject } from './choices';

import type { RangeInputPageObject } from '../input';
import type { ElementLike } from 'fractal-page-object';

export class FieldPageObject extends PageObject<HTMLDivElement | HTMLFieldSetElement> {
  static SELECTOR = '[data-test-field]';

  constructor(selector?: string, parent?: PageObject | ElementLike | null, index?: number | null) {
    super(selector ?? FieldPageObject.SELECTOR, parent, index);
  }

  $label = sel<HTMLLabelElement | HTMLLegendElement>('[data-test-label]');
  $description = sel<HTMLParagraphElement>('[data-test-description]');
  // $control = sel<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
  //   'input,select,textarea'
  // );

  // controls

  private $input = sel(InputPageObject.SELECTOR, InputPageObject);
  private $inputBuilder = sel(InputBuilderPageObject.SELECTOR, InputBuilderPageObject);
  private $select = sel(SelectPageObject.SELECTOR, SelectPageObject);
  private $textArea = sel(TextAreaPageObject.SELECTOR, TextAreaPageObject);
  private $checkbox = sel(CheckboxPageObject.SELECTOR, CheckboxPageObject);
  private $list = sel(ListPageObject.SELECTOR, ListPageObject);

  $choices = sel(ChoicesPageObject.SELECTOR, ChoicesPageObject);
  $errors = sel(
    '[data-test-error]',
    class extends PageObject<HTMLDivElement> {
      get type() {
        return this.element?.getAttribute('data-test-error-type');
      }

      get value() {
        return this.element?.getAttribute('data-test-error-value');
      }
    }
  );

  get $control():
    | InputPageObject
    | RangeInputPageObject
    | InputBuilderPageObject
    | SelectPageObject
    | TextAreaPageObject
    | ListPageObject {
    if (this.$inputBuilder.element) {
      return this.$inputBuilder;
    }

    if (this.$checkbox.element) {
      return this.$checkbox;
    }

    if (this.$input.element?.type === 'range') {
      return this.$input as RangeInputPageObject;
    }

    if (this.$input.element) {
      return this.$input;
    }

    if (this.$select.element) {
      return this.$select;
    }

    if (this.$textArea.element) {
      return this.$textArea;
    }

    if (this.$list.element) {
      return this.$list;
    }

    return this.$input; // @TODO bad fallback for now
  }

  get name() {
    return this.element?.getAttribute('data-test-field');
  }
}
