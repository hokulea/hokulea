import { hbs } from 'ember-cli-htmlbars';

import { action } from '@storybook/addon-actions';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Components/Inputs/Select',
  parameters: {
    options: {
      showPanel: true,
      isToolshown: true
    }
  }
};

export const Default = () => {
  return {
    template: hbs`
      <Select @options={{array "Banana" "Apple" "Pear"}} as |option|>
        {{option}}
      </Select> this text is supposed to be next to the select
      <p>Some text under the select</p>
      <p>Some text under the select</p>
      <p>Some text under the select</p>
      <p>Some text under the select</p>
      <p>Some text under the select</p>
      <p>Some text under the select</p>
      <p>Some text under the select</p>
      <select>
        <option>foo</option>
        <option>bar</option>
      </select>
      <p>Some text under the select</p>
    `,
    context: {
      update: action('checked')
    }
  };
};

Default.story = {
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/Fq29S0hD3i38bAjYz3wWwy/Hokulea?node-id=575%3A9'
    }
  }
};
