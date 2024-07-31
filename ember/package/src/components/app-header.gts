import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { hash } from '@ember/helper';
import { uniqueId } from '@ember/helper';

import { type CommandAction, CommandElement } from 'ember-command';
import { keepLatestTask, timeout } from 'ember-concurrency';
import { Link } from 'ember-link';
import { modifier } from 'ember-modifier';
import { provide } from 'ember-provide-consume-context';

import styles from '@hokulea/core/navigation.module.css';

import { and, not, or } from '../-private/helpers';
import popover from '../helpers/popover';
import IconButton from './icon-button';
import Menu from './menu';

import type { MenuItemArgs, MenuItemBlocks, MenuItemSignature } from './-menu';
import type { TOC } from '@ember/component/template-only';

const asLink = (value: unknown): Link => {
  return value as Link;
};

const isActive = (commandable: CommandAction) => {
  return commandable instanceof Link && (commandable as Link).isActive;
};

interface NavItemSignature extends MenuItemSignature {}

const NavLink: TOC<{
  Args: MenuItemArgs;
  Blocks: MenuItemBlocks;
}> = <template>
  {{#if @push}}
    <CommandElement @command={{@push}} aria-current="{{if (isActive @push) 'page'}}" part="item">
      <span>{{yield}}</span>
    </CommandElement>
  {{else}}
    <span part="item">{{yield}}</span>
  {{/if}}
</template>;

const NavItem: TOC<NavItemSignature> = <template>
  {{#if (has-block)}}
    <NavLink @push={{asLink @push}}>{{yield}}</NavLink>
  {{else if (and (has-block "menu") (has-block "label"))}}
    {{#let (popover position="bottom-start") as |p|}}
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
    <NavLink @push={{asLink @push}}>{{yield}}</NavLink>
  {{else if (and (has-block "menu") (has-block "label"))}}
    <details>
      <summary part="item">{{yield to="label"}}</summary>

      <div>
        {{yield (hash Item=PopoverNavItem) to="menu"}}
      </div>
    </details>
  {{/if}}
</template>;

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
    aux?: [{ Item: typeof NavItem }];
  };
}

export default class AppHeader extends Component<AppHeaderSignature> {
  @tracked topNavShown = true;
  @tracked sensing = false;

  @provide('hokulea-app-header')
  get appHeader() {
    return true;
  }

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

    sensor();
    window.addEventListener('resize', sensor);

    return () => {
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
            ['a', 'button'].includes((target as HTMLElement).tagName.toLowerCase())
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
                  @icon={{if p.opened "x" "list"}}
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
                        {{yield (hash Item=PopoverNavItem) to="aux"}}
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
