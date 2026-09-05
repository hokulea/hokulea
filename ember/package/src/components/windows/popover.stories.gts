import { popover } from '../../helpers/popover.ts';
import { Button } from '../actions/button.gts';
import { Popover } from './popover.gts';

import type { Meta, StoryObj } from 'ember-storybook';

export default {
  title: 'Windows/Popover',
  component: Popover,
  argTypes: {
    position: {
      name: 'Position',
      options: [
        'top span-right',
        'top',
        'top span-left',
        'right span-bottom',
        'right',
        'right span-top',
        'bottom span-right',
        'bottom',
        'bottom span-left',
        'left span-bottom',
        'left',
        'left span-top'
      ],
      control: {
        type: 'radio'
      }
    }
  }
} satisfies Meta;

export const Default: StoryObj = {
  render: (args) => <template>
    <div style="display: grid; width: 100%; height: min(100vh, 300px); place-items: center;">
      {{#let (popover position=args.position) as |p|}}
        <Button {{p.trigger}}>Hello there</Button>

        <Popover {{p.target}}>
          Obi<br />
          Wan<br />
          Kenobi!
        </Popover>
      {{/let}}
    </div>
  </template>,
  args: {
    position: 'top-start'
  }
};
