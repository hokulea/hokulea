import RouteTemplate from 'ember-route-template';

import { Card, Page, Section } from '#src';

export default RouteTemplate(
  <template>
    <Page @title="Content">
      <Card>A Card with sample text</Card>

      <Card>
        <:header>Planning</:header>
        <:body>Makro, Meso, Micro - but also contents</:body>
      </Card>

      <Section @title="Section">
        <p>with sample "content"</p>
      </Section>

      <Section @title="Training">
        <p>Planning, Diagnostics, Control, Documentation</p>
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
    </Page>
  </template>
);
