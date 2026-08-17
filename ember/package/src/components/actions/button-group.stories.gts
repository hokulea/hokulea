import { action } from 'storybook/actions';

import { Button } from './button.gts';
import { ButtonGroup } from './button-group.gts';

import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Actions/ButtonGroup',
  component: ButtonGroup
} satisfies Meta;

export const Showcase: StoryObj = {
  render: (args) => <template>
    <ButtonGroup>
      <Button @push={{args.push}}>First</Button>
      <Button @push={{args.push}}>Second</Button>
      <Button @push={{args.push}}>Third</Button>
    </ButtonGroup>
  </template>,
  args: {
    push: action('button pushed')
  }
};

export const Stack: StoryObj = {
  render: (args) => <template>
    <div
      style="display: flex; width: 50%; flex-direction: column; gap: var(--spacing-container-gap-block-1); margin: auto;"
    >
      <h3>Default</h3>
      <ButtonGroup>
        <Button @push={{args.push}}>First</Button>
        <Button @push={{args.push}}>Second</Button>
        <Button @push={{args.push}}>Third</Button>
      </ButtonGroup>

      <h3>Mixed Intents</h3>
      <ButtonGroup>
        <Button @push={{args.push}} @intent="alternative">Alternative</Button>
        <Button @push={{args.push}} @intent="danger">Danger</Button>
      </ButtonGroup>

      <h3>Mixed Importances</h3>
      <ButtonGroup>
        <Button @push={{args.push}} @importance="supreme">Supreme</Button>
        <Button @push={{args.push}} @importance="subtle">Subtle</Button>
        <Button @push={{args.push}} @importance="plain">Plain</Button>
      </ButtonGroup>
    </div>
  </template>,
  args: {
    push: action('button pushed')
  }
};
