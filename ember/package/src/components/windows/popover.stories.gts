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
        'top-start',
        'top',
        'top-end',
        'right-start',
        'right',
        'right-end',
        'bottom-start',
        'bottom',
        'bottom-end',
        'left-start',
        'left',
        'left-end'
      ],
      control: {
        type: 'radio'
      }
    }
  }
} satisfies Meta;

export const Default: StoryObj = {
  render: (args) => <template>
    <div style="display: grid; width: 100%; height: 100vh; place-items: center;">
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
