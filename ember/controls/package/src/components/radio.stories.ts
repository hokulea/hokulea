import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Components/Controls/Radio',
  parameters: {
    options: {
      showPanel: true,
      isToolshown: true
    }
  },
  controls: { hideNoControlsWarning: true }
};

export const Default = () => ({
  template: hbs`
      <Radio @update={{fn this.update}}/>
      <Radio disabled={{true}}/>
      <Radio @value={{true}} @update={{fn this.update}}/>
      <Radio @value={{true}} disabled={{true}}/>
    `,
  context: {
    update: action('checked')
  }
});

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

export const Labelled = () => ({
  template: hbs`
      <label>
        <Radio @update={{fn this.update}}/>
        Default
      </label>

      <label>
        <Radio disabled={{true}}/>
        Disabled
      </label>

      <label>
        <Radio @value={{true}} @update={{fn this.update}}/>
        Default + Checked
      </label>

      <label>
        <Radio @value={{true}} disabled={{true}}/>
        Disabled + Checked
      </label>
    `,
  context: {
    update: action('checked')
  }
});

export const Sizing = () => ({
  template: hbs`
      <label {{style fontSize="80%"}}>
        <Radio @update={{fn this.update}}/>
        80%
      </label>

      <label>
        <Radio disabled={{true}}/>
        Normal
      </label>

      <label {{style fontSize="120%"}}>
        <Radio @value={{true}} @update={{fn this.update}}/>
        120%
      </label>

      <label {{style fontSize="150%"}}>
        <Radio @value={{true}} disabled={{true}}/>
        150%
      </label>
    `,
  context: {
    update: action('checked')
  }
});
