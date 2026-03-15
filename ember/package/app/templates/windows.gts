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
    position: 'top'
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
              <c.Option @value="top span-right" @label="top span-right" />
              <c.Option @value="top" @label="top" />
              <c.Option @value="top span-left" @label="top span-left" />
              <c.Option @value="right span-bottom" @label="right span-bottom" />
              <c.Option @value="right" @label="right" />
              <c.Option @value="right span-top" @label="right span-top" />
              <c.Option @value="bottom span-right" @label="bottom span-right" />
              <c.Option @value="bottom" @label="bottom" />
              <c.Option @value="bottom span-left" @label="bottom span-left" />
              <c.Option @value="left span-bottom" @label="left span-bottom" />
              <c.Option @value="left" @label="left" />
              <c.Option @value="left span-top" @label="left span-top" />
            </f.SingularChoice>

            <f.SingularChoice @name="fallback" @label="Fallback" as |c|>
              <c.Option @value="none" @label="none" />
              <c.Option @value="flip-inline" @label="flip-inline" />
              <c.Option @value="flip-block" @label="flip-block" />
              <c.Option @value="flip-start" @label="flip-start" />
            </f.SingularChoice>
          </Form>
        </div>
      </Section>
    </SectionedPage>
  </template>
}
