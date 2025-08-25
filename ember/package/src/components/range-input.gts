import { on } from '@ember/modifier';

import { modifier } from 'ember-modifier';

import styles from '@hokulea/core/controls.module.css';

import { pick } from '../-private/helpers.ts';
import { pickAsNumber } from './-input.ts';

import type { InputArgs } from './-input.ts';
import type { TOC } from '@ember/component/template-only';

function applyProgressStyle(range: HTMLInputElement, value?: number) {
  const min = Number.parseFloat(range.min) || 0;
  const max = Number.parseFloat(range.max) || 100;
  const currentVal = value ?? Number.parseFloat(range.value);
  const progress = ((currentVal - min) / (max - min)) * 100;

  range.style.setProperty('--_hokulea-slider-progress', `${progress}%`);
}

const progressStyle = modifier((element: HTMLInputElement, [value]: [number?]) => {
  applyProgressStyle(element, value);

  const listenForProgressChange = () => {
    applyProgressStyle(element);
  };

  element.addEventListener('input', listenForProgressChange);

  return () => element.removeEventListener('input', listenForProgressChange);
});

export interface RangeInputSignature {
  Element: HTMLInputElement;
  Args: InputArgs<number> & {
    min?: number;
    max?: number;
    step?: number | 'any';
    orientation?: 'horizontal' | 'vertical';
  };
}

const RangeInput: TOC<RangeInputSignature> = <template>
  <input
    class={{styles.range}}
    type="range"
    value={{@value}}
    disabled={{@disabled}}
    data-test-input
    data-orientation={{@orientation}}
    {{on "input" (pick "target.value" (pickAsNumber @update)) capture=true}}
    {{progressStyle @value}}
    ...attributes
  />
</template>;

export default RangeInput;
