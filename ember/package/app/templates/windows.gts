import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import {
  Button,
  Form,
  type FormValidationHandler,
  Popover,
  popover,
  Section,
  SectionedPage
} from '#src';

export default class ActionsRoute extends Component {
  @tracked data = {
    position: 'top-start'
  };

  changePosition: FormValidationHandler<typeof this.data> = ({ data }) => {
    this.data = data;

    // eslint-disable-next-line unicorn/no-useless-undefined
    return undefined;
  };

  <template>
    <style scoped>
      .popover-area {
        display: grid;
        place-items: center;
        width: 100%;
        height: 100%;
      }
    </style>
    <SectionedPage @title="Windows">
      <Section @title="Popovers">
        <div class="cols">
          <div class="popover-area">
            {{#let (popover position=this.data.position) as |p|}}
              <Button {{p.trigger}}>Hello there</Button>

              <Popover {{p.target}}>
                Obi<br />
                Wan<br />
                Kenobi!
              </Popover>
            {{/let}}
          </div>
          <Form @data={{this.data}} @validateOn="input" @validate={{this.changePosition}} as |f|>
            <f.SingularChoice @name="position" @label="Position" as |c|>
              <c.Option @value="top-start" @label="top-start" />
              <c.Option @value="top" @label="top" />
              <c.Option @value="top-end" @label="top-end" />
              <c.Option @value="right-start" @label="right-start" />
              <c.Option @value="right" @label="right" />
              <c.Option @value="right-end" @label="right-end" />
              <c.Option @value="bottom-start" @label="bottom-start" />
              <c.Option @value="bottom" @label="bottom" />
              <c.Option @value="bottom-end" @label="bottom-end" />
              <c.Option @value="left-start" @label="left-start" />
              <c.Option @value="left" @label="left" />
              <c.Option @value="left-end" @label="left-end" />
            </f.SingularChoice>
          </Form>
        </div>
      </Section>
    </SectionedPage>
  </template>
}
