import { hbs } from 'ember-cli-htmlbars';

import { action } from 'storybook/actions';

export default {
  title: 'Components/Actions/ButtonGroup',
  component: 'button-group',
  parameters: {
    options: {
      showPanel: true,
      showToolbar: true
    }
  }
};

export const Showcase = {
  render: {
    template: hbs`
      <ButtonGroup @disabled={{this.disabled}}>
        <Button @push={{this.push}}>First</Button>
        <Button @push={{this.push}}>Second</Button>
        <Button @push={{this.push}}>Third</Button>
      </ButtonGroup>
    `,
    context: {
      push: action('button pushed')
    }
  }
};

export const Stack = {
  render: () => ({
    template: hbs`
      {{!-- template-lint-disable no-inline-styles --}}
      <div style="display: flex; width: 50%; flex-direction: column; gap: var(--spacing-container-gap-block-1); margin: auto;">
        <h3>Default</h3>
        <ButtonGroup>
          <Button @push={{this.push}}>First</Button>
          <Button @push={{this.push}}>Second</Button>
          <Button @push={{this.push}}>Third</Button>
        </ButtonGroup>


        <h3>Mixed Intents</h3>
        <ButtonGroup>
          <Button @push={{this.push}} @intent="alternative">Alternative</Button>
          <Button @push={{this.push}} @intent="danger">Danger</Button>
        </ButtonGroup>

        <h3>Mixed Importances</h3>
        <ButtonGroup>
          <Button @push={{this.push}} @importance="supreme">Supreme</Button>
          <Button @push={{this.push}} @importance="subtle">Subtle</Button>
          <Button @push={{this.push}} @importance="plain">Plain</Button>
        </ButtonGroup>
      </div>
    `,
    context: {
      push: action('button pushed')
    }
  }),
  parameters: {
    options: {
      showPanel: false
    }
  }
};
