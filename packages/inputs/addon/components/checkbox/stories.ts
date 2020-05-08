import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Components|Inputs/Checkbox'
};

export const Default = () => {
  return {
    template: hbs`
      <Checkbox/>
      <Checkbox disabled={{true}}/>
      <Checkbox @value={{true}}/>
      <Checkbox @value={{true}} disabled={{true}}/>
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
        'https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Components?node-id=404%3A411'
    }
  }
};

export const Labelled = () => {
  return {
    template: hbs`
      <label>
        <Checkbox/>
        Default
      </label>

      <label>
        <Checkbox disabled={{true}}/>
        Disabled
      </label>

      <label>
        <Checkbox @value={{true}}/>
        Default + Checked
      </label>

      <label>
        <Checkbox @value={{true}} disabled={{true}}/>
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
        <Checkbox/>
        80%
      </label>

      <label>
        <Checkbox disabled={{true}}/>
        Normal
      </label>

      <label {{style fontSize="120%"}}>
        <Checkbox @value={{true}}/>
        120%
      </label>

      <label {{style fontSize="150%"}}>
        <Checkbox @value={{true}} disabled={{true}}/>
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
