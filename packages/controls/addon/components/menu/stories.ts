import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Components/Controls/Menu',
  parameters: {
    options: {
      showPanel: true,
      isToolshown: true
    }
  },
  controls: { hideNoControlsWarning: true }
};

export const Default = () => ({
  template: hbs`
      <Menu as |m|>
        <m.Item>First</m.Item>
        <m.Item>Second</m.Item>
        <m.Item>Third</m.Item>
      </Menu>
    `
});

export const WithSubmenu = () => ({
  template: hbs`
      <Menu as |m|>
        <m.Item>First</m.Item>

        <m.Item>
          <:label>Second</:label>
          <:menu as |sm|>
            <sm.Item>Sub 1</sm.Item>

            <sm.Item>
              <:label>Sub 2</:label>
              <:menu as |ssm|>
                <ssm.Item>Sub 2.1</ssm.Item>
                <ssm.Item>Sub 2.2</ssm.Item>
                <ssm.Item>Sub 2.3</ssm.Item>
              </:menu>
            </sm.Item>

            <sm.Item>Sub 3</sm.Item>
          </:menu>
        </m.Item>

        <m.Item>
          <:label>Third</:label>
          <:menu as |tm|>
            <tm.Item>Third 1</tm.Item>
            <tm.Item>Third 2</tm.Item>
          </:menu>
        </m.Item>
      </Menu>
    `
});
