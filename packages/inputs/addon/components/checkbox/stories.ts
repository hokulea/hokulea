import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Components/Inputs/Checkbox',
  parameters: {
    options: {
      showPanel: true,
      isToolshown: true
    }
  }
};

export const Default = () => ({
  template: hbs`
      <Checkbox @update={{fn this.update}}/>
      <Checkbox disabled={{true}}/>
      <Checkbox @value={{true}} @update={{fn this.update}}/>
      <Checkbox @value={{true}} disabled={{true}}/>
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
        'https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Components?node-id=404%3A411'
    }
  }
};

export const Labelled = () => ({
  template: hbs`
      <label>
        <Checkbox @update={{fn this.update}}/>
        Default
      </label>

      <label>
        <Checkbox disabled={{true}}/>
        Disabled
      </label>

      <label>
        <Checkbox @value={{true}} @update={{fn this.update}}/>
        Default + Checked
      </label>

      <label>
        <Checkbox @value={{true}} disabled={{true}}/>
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
        <Checkbox @update={{fn this.update}}/>
        80%
      </label>

      <label>
        <Checkbox disabled={{true}}/>
        Normal
      </label>

      <label {{style fontSize="120%"}}>
        <Checkbox @value={{true}} @update={{fn this.update}}/>
        120%
      </label>

      <label {{style fontSize="150%"}}>
        <Checkbox @value={{true}} disabled={{true}}/>
        150%
      </label>
    `,
  context: {
    update: action('checked')
  }
});
