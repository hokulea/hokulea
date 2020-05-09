import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Components|Inputs/Radio'
};

export const Default = () => {
  return {
    template: hbs`
      <Radio/>
      <Radio disabled={{true}}/>
      <Radio @value={{true}}/>
      <Radio @value={{true}} disabled={{true}}/>
    `,
    context: {
      get type() {
        return action('type');
      }
    }
  };
};

Default.story = {
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Components?node-id=442%3A0'
    }
  }
};

export const Labelled = () => {
  return {
    template: hbs`
      <label>
        <Radio/>
        Default
      </label>

      <label>
        <Radio disabled={{true}}/>
        Disabled
      </label>

      <label>
        <Radio @value={{true}}/>
        Default + Checked
      </label>

      <label>
        <Radio @value={{true}} disabled={{true}}/>
        Disabled + Checked
      </label>
    `,
    context: {
      get type() {
        return action('type');
      }
    }
  };
};

export const Sizing = () => {
  return {
    template: hbs`
      <label {{style fontSize="80%"}}>
        <Radio/>
        80%
      </label>

      <label>
        <Radio disabled={{true}}/>
        Normal
      </label>

      <label {{style fontSize="120%"}}>
        <Radio @value={{true}}/>
        120%
      </label>

      <label {{style fontSize="150%"}}>
        <Radio @value={{true}} disabled={{true}}/>
        150%
      </label>
    `,
    context: {
      get type() {
        return action('type');
      }
    }
  };
};
