import Route from 'ember-polaris-routing/route';
import CompatRoute from 'ember-polaris-routing/route/compat';

import { Card, Section } from '@hokulea/ember';

export class ContentRoute extends Route<{}> {
  <template>
    <h2>Content</h2>

    <Card>A Card with sample text</Card>

    <Card>
      <:header>Planning</:header>
      <:body>Makro, Meso, Micro - but also contents</:body>
    </Card>

    <Section @title="Section">with sample "content"</Section>

    <Section @title="Training">
      Planning, Diagnostics, Control, Documentation
    </Section>

    <Section @title="Training">
      <Card>
        <:header>Planning</:header>
        <:body>Makro, Meso, Micro - but also contents</:body>
      </Card>

      <Card>
        <:header>Controlling</:header>
        <:body>Parameters to control the practice</:body>
      </Card>
    </Section>

    <Section @title="Section">
      <Card>... with a card</Card>
    </Section>
  </template>
}

export default CompatRoute(ContentRoute);
