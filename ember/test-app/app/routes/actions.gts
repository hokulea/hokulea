import Route from 'ember-polaris-routing/route';
import CompatRoute from 'ember-polaris-routing/route/compat';

import { Button, Icon, IconButton, Page, Section } from '@hokulea/ember';

export class ActionsRoute extends Route<object> {
  <template>
    <Page @title="Actions">

      <Section @title="Buttons">

        <p>
          <Button>Supreme</Button>
          <Button @importance="subtle">Subtle</Button>
          <Button @importance="plain">Plain</Button>
        </p>

        <p>
          <Button @intent="alternative">Supreme</Button>
          <Button @intent="alternative" @importance="subtle">Subtle</Button>
          <Button @intent="alternative" @importance="plain">Plain</Button>
        </p>

        <p>
          <Button @intent="highlight">Supreme</Button>
          <Button @intent="highlight" @importance="subtle">Subtle</Button>
          <Button @intent="highlight" @importance="plain">Plain</Button>
        </p>

        <p>
          <Button @intent="danger">Supreme</Button>
          <Button @intent="danger" @importance="subtle">Subtle</Button>
          <Button @intent="danger" @importance="plain">Plain</Button>
        </p>
      </Section>

      <Section @title="Button with Icons">
        <p>
          lalala
          <Button>
            <:before><Icon @icon="arrow-right" /></:before>
            <:label>Here</:label>
          </Button>

          <Button @intent="highlight" @spacing="-1">
            <:before><Icon @icon="unicycle" /></:before>
            <:label>greater</:label>
            <:after><Icon @icon="bike" /></:after>
          </Button>

          <Button @intent="alternative">
            <:label>Next</:label>
            <:after><Icon @icon="arrow-right" /></:after>
          </Button>
        </p>
      </Section>

      <Section @title="Icon Button">
        <p>
          <IconButton @icon="activity" @label="Let's go" />
          <IconButton @icon="unicycle" @label="Let's ride" />
        </p>
      </Section>

    </Page>
  </template>
}

export default CompatRoute(ActionsRoute);
