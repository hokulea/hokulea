import Route from 'ember-polaris-routing/route';
import CompatRoute from 'ember-polaris-routing/route/compat';

import { Button, Section } from '@hokulea/ember';

export class ActionsRoute extends Route<{}> {
  <template>
    <h2>Actions</h2>

    <Section @title='Action'>
      <Button>Supreme</Button>
      <Button @importance='subtle'>Subtle</Button>
      <Button @importance='plain'>Plain</Button>
    </Section>

    <Section @title='Alternative'>
      <Button @intent='alternative'>Supreme</Button>
      <Button @intent='alternative' @importance='subtle'>Subtle</Button>
      <Button @intent='alternative' @importance='plain'>Plain</Button>
    </Section>

    <Section @title='Highlight'>
      <Button @intent='highlight'>Supreme</Button>
      <Button @intent='highlight' @importance='subtle'>Subtle</Button>
      <Button @intent='highlight' @importance='plain'>Plain</Button>
    </Section>

    <Section @title='Danger'>
      <Button @intent='danger'>Supreme</Button>
      <Button @intent='danger' @importance='subtle'>Subtle</Button>
      <Button @intent='danger' @importance='plain'>Plain</Button>
    </Section>
  </template>
}

export default CompatRoute(ActionsRoute);
