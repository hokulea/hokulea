import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { hash, uniqueId } from '@ember/helper';

import { type CommandAction, CommandElement } from 'ember-command';
import { keepLatestTask, timeout } from 'ember-concurrency';
import { modifier } from 'ember-modifier';

import styles from '@hokulea/core/navigation.module.css';

import { and, not, or } from '../../-private/helpers.ts';
import { popover } from '../../helpers/popover.ts';
import { IconButton } from '../actions/icon-button.gts';
import { Menu } from '../controls/menu.gts';
import { NavLink } from './nav-link.gts';

import type { MenuItemSignature } from '../controls/-menu';
import type { TOC } from '@ember/component/template-only';
import type { Placement } from '@floating-ui/dom';
import type { ComponentLike } from '@glint/template';
import type { Link } from 'ember-link';

const asLink = (value: unknown): Link => {
  return value as Link;
};

interface NavItemSignature extends MenuItemSignature {
  Args: MenuItemSignature['Args'] & {
    href?: string;
    position?: Placement;
  };
}

const NavItem: TOC<NavItemSignature> = <template>
  {{#if (has-block)}}
    <NavLink @push={{asLink @push}} @href={{@href}}>{{yield}}</NavLink>
  {{else if (and (has-block "menu") (has-block "label"))}}
    {{#let (popover position=(if @position @position "bottom-start")) as |p|}}
      <button type="button" aria-haspopup="menu" part="item" {{p.trigger}}>
        <span>{{yield to="label"}}</span>
      </button>

      <Menu {{p.target}} as |m|>
        {{yield m to="menu"}}
      </Menu>
    {{/let}}
  {{/if}}
</template>;

const PopoverNavItem: TOC<NavItemSignature> = <template>
  {{#if (has-block)}}
    <NavLink @push={{asLink @push}} @href={{@href}}>{{yield}}</NavLink>
  {{else if (and (has-block "menu") (has-block "label"))}}
    <details>
      <summary part="item">{{yield to="label"}}</summary>

      <div>
        {{yield (hash Item=PopoverNavItem) to="menu"}}
      </div>
    </details>
  {{/if}}
</template>;

const CloseIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128L50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z"/></svg>';
const ListIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M224 128a8 8 0 0 1-8 8H40a8 8 0 0 1 0-16h176a8 8 0 0 1 8 8M40 72h176a8 8 0 0 0 0-16H40a8 8 0 0 0 0 16m176 112H40a8 8 0 0 0 0 16h176a8 8 0 0 0 0-16"/></svg>';

interface AppHeaderSignature {
  Element: HTMLElement;
  Args: {
    /**
     * Position of the navbar
     *
     * @default start
     */
    position?: 'start' | 'center' | 'end';

    home?: CommandAction;
  };
  Blocks: {
    brand?: [];
    nav?: [{ Item: typeof NavItem }];
    aux?: [{ Item: ComponentLike<typeof NavItem> }];
  };
}

export class AppHeader extends Component<AppHeaderSignature> {
  @tracked topNavShown = true;
  @tracked sensing = false;

  detectOverflow = keepLatestTask(async (element: HTMLElement) => {
    await timeout(30);

    this.sensing = true;

    // wait till sensing is flushed to the browser and made elements visible
    await timeout(0);

    const relevantChildren = [...element.children].filter(
      (elem) => elem.tagName.toLowerCase() === 'nav' || elem.getAttribute('part') === 'aux'
    );

    if (relevantChildren.length === 0) {
      this.sensing = false;

      return;
    }

    let headerWidth = [...element.children]
      .filter((elem) => elem.getAttribute('part') !== 'menu')
      .map((e) => Math.floor(e.scrollWidth))
      .reduce((sum, elemWidth) => sum + elemWidth, 0);

    // + padding
    headerWidth +=
      Number.parseInt(getComputedStyle(element).getPropertyValue('padding-inline'), 10) * 2;

    // + gap
    headerWidth +=
      Number.parseInt(getComputedStyle(element).getPropertyValue('gap'), 10) *
      (element.childElementCount - 1);

    this.topNavShown = element.clientWidth >= headerWidth;
    this.sensing = false;
  });

  flipflop = modifier((element: HTMLElement) => {
    const sensor = () => this.detectOverflow.perform(element);

    void sensor();
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    window.addEventListener('resize', sensor);

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      window.removeEventListener('resize', sensor);
    };
  });

  closeWhenLink = modifier((element: HTMLElement) => {
    const checkForClose = (event: Event) => {
      const hitALink = event
        .composedPath()
        .some(
          (target: EventTarget) =>
            (target as HTMLElement | null)?.tagName &&
            ['a', 'button'].includes((target as HTMLElement).tagName.toLowerCase()) &&
            !(target as HTMLElement).getAttribute('aria-haspopup')
        );

      if (hitALink) {
        element.hidePopover();
      }
    };

    element.addEventListener('click', checkForClose);

    return () => {
      element.removeEventListener('click', checkForClose);
    };
  });

  <template>
    {{#let (uniqueId) as |brandId|}}
      <header class={{styles.appHeader}} data-test-app-header ...attributes>
        <div class={{styles.appHeaderContent}} data-sensing={{this.sensing}} {{this.flipflop}}>
          {{#if (has-block "brand")}}
            <CommandElement @command={{@home}} part="brand" id={{brandId}}>
              {{yield to="brand"}}
            </CommandElement>
          {{/if}}

          {{#if (or this.topNavShown this.sensing)}}
            <nav data-position={{if @position @position}} aria-labelledby={{brandId}}>
              {{yield (hash Item=NavItem) to="nav"}}
            </nav>

            {{#if (has-block "aux")}}
              <span part="aux">
                {{yield (hash Item=NavItem) to="aux"}}
              </span>
            {{/if}}
          {{/if}}

          {{#if (not this.topNavShown)}}
            <span part="menu">
              {{#let (popover) as |p|}}
                <IconButton
                  @importance="plain"
                  @icon={{if p.opened CloseIcon ListIcon}}
                  {{p.trigger}}
                  data-test-toggle
                  @label="toggle"
                />

                <div popover {{p.target}} {{this.closeWhenLink}}>
                  <div data-menu-header>
                    {{#if (has-block "brand")}}
                      <span part="brand">
                        {{yield to="brand"}}
                      </span>
                    {{/if}}
                  </div>

                  <div data-menu-content>
                    {{! template-lint-disable no-duplicate-landmark-elements }}
                    <nav aria-labelledby={{brandId}}>
                      {{yield (hash Item=PopoverNavItem) to="nav"}}
                    </nav>
                    {{! template-lint-enable no-duplicate-landmark-elements }}

                    {{#if (has-block "aux")}}
                      <span part="aux">
                        {{yield (hash Item=(component NavItem position="top-start")) to="aux"}}
                      </span>
                    {{/if}}
                  </div>
                </div>
              {{/let}}
            </span>
          {{/if}}
        </div>
      </header>
    {{/let}}
  </template>
}
