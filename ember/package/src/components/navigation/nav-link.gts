import { PushElement } from '../../-private/push.gts';
import { Icon } from '../graphics/icon.gts';

import type { MenuItemArgs, MenuItemBlocks } from '../controls/-menu.gts';
import type { TOC } from '@ember/component/template-only';

const MaybeIcon: TOC<{ Args: { icon?: string } }> = <template>
  {{#if @icon}}
    <Icon @icon={{@icon}} part="icon" />
  {{/if}}
</template>;

interface NavLinkSignature {
  Args: MenuItemArgs & {
    href?: string;
    icon?: string;
  };
  Blocks: MenuItemBlocks;
}

export const NavLink: TOC<NavLinkSignature> = <template>
  <PushElement @push={{@push}} @href={{@href}} part="item" ...attributes>
    <MaybeIcon @icon={{@icon}} />
    {{yield}}
  </PushElement>
</template>;
