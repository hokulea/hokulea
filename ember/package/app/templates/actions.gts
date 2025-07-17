import { link } from 'ember-link';
import RouteTemplate from 'ember-route-template';

import { Button, Icon, IconButton, Page, Section } from '#src';
import Unicycle from '~icons/custom/unicycle';
import Activity from '~icons/ph/activity';
import ArrowRight from '~icons/ph/arrow-right';
import Bike from '~icons/ph/person-simple-bike';

export default RouteTemplate(
  <template>
    <Page @title="Actions">

      <Section @title="Buttons">
        <p>
          <Button @push={{link "actions"}}>Supreme</Button>
          <Button @importance="subtle" @push={{link "actions"}}>Subtle</Button>
          <Button @importance="plain" @push={{link "actions"}}>Plain</Button>
        </p>

        <p>
          <Button @intent="alternative" @push={{link "actions"}}>Supreme</Button>
          <Button @intent="alternative" @importance="subtle">Subtle</Button>
          <Button @intent="alternative" @importance="plain">Plain</Button>
        </p>

        <p>
          <Button @intent="highlight" @push={{link "actions"}}>Supreme</Button>
          <Button @intent="highlight" @importance="subtle">Subtle</Button>
          <Button @intent="highlight" @importance="plain">Plain</Button>
        </p>

        <p>
          <Button @intent="danger" @push={{link "actions"}}>Supreme</Button>
          <Button @intent="danger" @importance="subtle">Subtle</Button>
          <Button @intent="danger" @importance="plain">Plain</Button>
        </p>
      </Section>

      <Section @title="Button with Icons">
        <p>
          lalala
          <Button>
            <:before><Icon @icon={{ArrowRight}} /></:before>
            <:label>Here</:label>
          </Button>

          <Button @intent="highlight" @spacing="-1">
            <:before><Icon @icon={{Unicycle}} /></:before>
            <:label>greater</:label>
            <:after><Icon @icon={{Bike}} /></:after>
          </Button>

          <Button @intent="alternative">
            <:label>Next</:label>
            <:after><Icon @icon={{ArrowRight}} /></:after>
          </Button>
        </p>
      </Section>

      <Section @title="Icon Button">
        <p>
          <IconButton @icon={{Activity}} @label="Let's go" />
          <IconButton @icon={{Unicycle}} @label="Let's ride" />
        </p>
      </Section>

    </Page>
  </template>
);
