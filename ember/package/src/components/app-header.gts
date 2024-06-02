import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { hash } from '@ember/helper';
import { on } from '@ember/modifier';

import { keepLatestTask, timeout } from 'ember-concurrency';
import { modifier } from 'ember-modifier';

import styles from '@hokulea/core/navigation.module.css';

import { and, not, or } from '../-private/helpers';
import popover from '../helpers/popover';
import Icon from './icon';
import Menu, { type MenuDefaultBlock } from './menu';

import type { TOC } from '@ember/component/template-only';
import type { Link } from 'ember-link';

const asLink = (value: unknown): Link => {
  return value as Link;
};

interface NavItemSignature {
  Args: {
    push?: Link;
  };
  Blocks: {
    default?: [];
    label?: [];
    menu?: [MenuDefaultBlock];
  };
}

const NavLink: TOC<{ Element: HTMLAnchorElement; Args: { push: Link }; Blocks: { default: [] } }> =
  <template>
    {{#if @push}}
      <a
        href={{@push.url}}
        {{on 'click' @push.open}}
        aria-current='{{if @push.isActive "page"}}'
        ...attributes
      >
        <span>{{yield}}</span>
      </a>
    {{else}}
      <span>{{yield}}</span>
    {{/if}}
  </template>;

const NavItem: TOC<NavItemSignature> = <template>
  {{#if (has-block)}}
    <NavLink @push={{asLink @push}}>{{yield}}</NavLink>
  {{else if (and (has-block 'menu') (has-block 'label'))}}
    {{#let (popover position='bottom-start') as |p|}}
      <button type='button' aria-haspopup='menu' {{p.trigger}}>
        <span>{{yield to='label'}}</span>
      </button>

      <Menu {{p.target}} as |m|>
        {{yield m to='menu'}}
      </Menu>
    {{/let}}
  {{/if}}
</template>;

const PopoverNavItem: TOC<NavItemSignature> = <template>
  {{#if (has-block)}}
    <NavLink @push={{asLink @push}}>{{yield}}</NavLink>
  {{else if (and (has-block 'menu') (has-block 'label'))}}
    <details>
      <summary>{{yield to='label'}}</summary>

      <div>
        {{!@glint-ignore}}
        {{yield (hash Item=PopoverNavItem) to='menu'}}
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
  };
  Blocks: {
    brand?: [];
    nav?: [typeof NavItem];
    aux?: [typeof NavItem];
  };
}

export default class AppHeader extends Component<AppHeaderSignature> {
  @tracked topNavShown = true;
  @tracked sensing = false;

  detectOverflow = keepLatestTask(async (element: HTMLElement) => {
    await timeout(10);

    this.sensing = true;

    await timeout(0);

    if (![...element.children].find((elem) => elem.tagName.toLowerCase() === 'nav')) {
      return;
    }

    const parent = element.parentElement as HTMLElement;
    let headerWidth = [...element.children]
      .filter((elem) => elem.getAttribute('part') !== 'menu')
      .map((e) => e.scrollWidth)
      .reduce((sum, elemWidth) => sum + elemWidth, 0);

    // + padding
    headerWidth +=
      Number.parseInt(getComputedStyle(element).getPropertyValue('padding-inline'), 10) * 2;

    // + gap
    headerWidth +=
      Number.parseInt(getComputedStyle(element).getPropertyValue('gap'), 10) *
      (element.childElementCount - 1);

    this.topNavShown = parent.clientWidth > headerWidth;
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
          (target: EventTarget) => (target as HTMLElement | null)?.tagName.toLowerCase() === 'a'
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
    <header
      class={{styles.appHeader}}
      data-sensing={{if (and this.sensing (not this.topNavShown)) true}}
      {{this.flipflop}}
      ...attributes
    >
      {{#if (has-block 'brand')}}
        <span part='brand'>
          {{yield to='brand'}}
        </span>
      {{/if}}

      {{#if (or this.topNavShown this.sensing)}}
        <nav data-position={{if @position @position}}>
          {{yield NavItem to='nav'}}
        </nav>

        {{#if (has-block 'aux')}}
          <span part='aux'>
            {{yield NavItem to='aux'}}
          </span>
        {{/if}}
      {{/if}}

      {{#if (not this.topNavShown)}}
        <span part='menu'>
          {{#let (popover) as |p|}}
            <button type='button' {{p.trigger}}>
              <Icon @icon='menu' />
            </button>

            <section popover {{p.target}} {{this.closeWhenLink}}>
              <header>
                {{#if (has-block 'brand')}}
                  <span part='brand'>
                    {{yield to='brand'}}
                  </span>
                {{/if}}
              </header>

              <nav>
                {{yield PopoverNavItem to='nav'}}
              </nav>

              {{#if (has-block 'aux')}}
                <span part='aux'>
                  {{yield PopoverNavItem to='aux'}}
                </span>
              {{/if}}
            </section>
          {{/let}}
        </span>
      {{/if}}
    </header>
  </template>
}
