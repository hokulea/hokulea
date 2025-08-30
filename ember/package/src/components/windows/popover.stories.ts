import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Components/Windows/Popover',
  component: 'section',
  parameters: {
    options: {
      showPanel: true,
      showToolbar: true
    }
  },
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
};

export const Default = {
  render: (args: { position: string }) => ({
    template: hbs`
      {{!-- template-lint-disable no-inline-styles --}}
      <div style="display: grid; width: 100%; height: 100vh; place-items: center;">
        {{#let (popover position=this.position) as |p|}}
          <Button {{p.trigger}}>Hello there</Button>

          <Popover {{p.target}}>
            Obi<br>
            Wan<br>
            Kenobi!
          </Popover>
        {{/let}}
      </div>
    `,
    context: {
      ...args
    }
  }),
  args: {
    position: 'top-start'
  }
};
