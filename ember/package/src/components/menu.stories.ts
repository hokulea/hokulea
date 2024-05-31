import { hbs } from 'ember-cli-htmlbars';

export default {
  title: 'Components/Controls/Menu',
  component: 'Menu',
  parameters: {
    options: {
      showPanel: false,
      isToolshown: true
    }
  },
  controls: { hideNoControlsWarning: true }
};

// function parseOptionalBooleanArg(arg) {
//   return typeof arg === 'boolean' ? arg : typeof arg === 'string' ? JSON.parse(arg) : undefined;
// }

// function parseArgs(args) {
//   return {
//     ...args,
//     disabled: parseOptionalBooleanArg(args.disabled)
//   };
// }

export const Menu = {
  render: () => ({
    template: hbs`
      <Menu as |m|>
        <m.Item>Rename Symbol</m.Item>
        <m.Item>Format Document</m.Item>
        <m.Item>Refactor...</m.Item>
        <m.Item>Source Action...</m.Item>
        <hr>
        <m.Item>
          <:label>Share</:label>
          <:menu as |s|>
            <s.Item>
              <:label>Code</:label>
              <:menu as |c|>
                <c.Item>Copy Github Permalink</c.Item>
                <c.Item>Copy Github Head Link</c.Item>
              </:menu>
            </s.Item>
            <s.Item>
              <:label>Social</:label>
              <:menu as |c|>
                <c.Item>Twitter</c.Item>
                <c.Item>Mastodon</c.Item>
                <c.Item>Bsky</c.Item>
              </:menu>
            </s.Item>
          </:menu>
        </m.Item>
        <hr>
        <m.Item>Cut</m.Item>
        <m.Item>Copy</m.Item>
        <m.Item>Paste</m.Item>
      </Menu>
    `
  })
};

export const ButtonMenu = {
  render: () => ({
    template: hbs`
      {{#let (popover position='bottom-start') as |p|}}
        <Button {{p.trigger}}>Open Menu</Button>
        <Menu {{p.target}} as |m|>
          <m.Item>Rename Symbol</m.Item>
          <m.Item>Format Document</m.Item>
          <m.Item>Refactor...</m.Item>
          <m.Item>Source Action...</m.Item>
          <hr>
          <m.Item>
            <:label>Share</:label>
            <:menu as |s|>
              <s.Item>
                <:label>Code</:label>
                <:menu as |c|>
                  <c.Item>Copy Github Permalink</c.Item>
                  <c.Item>Copy Github Head Link</c.Item>
                </:menu>
              </s.Item>
              <s.Item>
                <:label>Social</:label>
                <:menu as |c|>
                  <c.Item>Twitter</c.Item>
                  <c.Item>Mastodon</c.Item>
                  <c.Item>Bsky</c.Item>
                </:menu>
              </s.Item>
            </:menu>
          </m.Item>
          <hr>
          <m.Item>Cut</m.Item>
          <m.Item>Copy</m.Item>
          <m.Item>Paste</m.Item>
        </Menu>
      {{/let}}
    `
  })
};
