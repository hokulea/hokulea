import type { TOC } from '@ember/component/template-only';
import type { ComponentLike } from '@glint/template';
import type { CommandAction } from 'ember-command';

type MenuItemElement = HTMLAnchorElement | HTMLButtonElement | HTMLSpanElement;

type MenuItemArgs = {
  push?: CommandAction;
  disabled?: boolean;
};

interface MenuItemSignature {
  Element: MenuItemElement;
  Args: MenuItemArgs;
  Blocks: MenuItemBlocks;
}

type MenuItemLike = ComponentLike<MenuItemSignature>;

type MenuBlock = {
  Item: MenuItemLike;
};

type MenuItemBlocks = {
  default?: [];
  label?: [];
  menu?: [MenuBlock];
};

interface RefactorMenuSignature {
  Args: {
    menu: MenuBlock;
  };
}

const RefactorMenuFactory: TOC<RefactorMenuSignature> = <template>
  {{#let @menu as |m|}}
    <m.Item>Format Document</m.Item>
    <m.Item>Refactor...</m.Item>
    <m.Item>Source Action...</m.Item>
    <hr />
    <m.Item>
      <:label>Share></:label>
      <:menu as |sm|>
        <sm.Item>Code</sm.Item>
        <sm.Item>
          <:label>Social</:label>
          <:menu as |som|>
            <som.Item>Twitter</som.Item>
            <som.Item>Mastodon</som.Item>
            <som.Item>Bsky</som.Item>
          </:menu>
        </sm.Item>
      </:menu>
    </m.Item>
    <m.Item>Cut</m.Item>
    <m.Item>Copy</m.Item>
    <m.Item>Paste</m.Item>
  {{/let}}
</template>;

export { RefactorMenuFactory };
