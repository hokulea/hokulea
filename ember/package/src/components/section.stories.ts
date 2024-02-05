import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Components/Content/Section',
  component: 'section',
  parameters: {
    options: {
      showPanel: false,
      showToolbar: true
    }
  }
};

export const Default = () => {
  return {
    template: hbs`
      <Section @title="Training">
        Planning, Diagnostics, Control, Documentation
      </Section>
    `
  };
};

export const WithCard = () => {
  return {
    template: hbs`
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
    `
  };
};
