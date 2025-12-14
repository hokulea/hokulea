import Component from '@glimmer/component';
import { uniqueId } from '@ember/helper';

import { element } from 'ember-element-helper';

import { type Importance, Indicator } from '@hokulea/tokens';

import { Icon, type IconAsset } from '../graphics/icon.gts';

import type { ComponentLike } from '@glint/template';

const Info = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"
viewBox="0 0 256 256"><path fill="currentColor" d="M128 24a104 104 0 1 0 104
104A104.11 104.11 0 0 0 128 24m-4 48a12 12 0 1 1-12 12a12 12 0 0 1 12-12m12
112a16 16 0 0 1-16-16v-40a8 8 0 0 1 0-16a16 16 0 0 1 16 16v40a8 8 0 0 1 0
16"/></svg>`;
const Success = `<svg xmlns="http://www.w3.org/2000/svg" width="256"
height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M128 24a104 104
0 1 0 104 104A104.11 104.11 0 0 0 128 24m45.66 85.66l-56 56a8 8 0 0 1-11.32
0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32
11.32"/></svg>`;
const Warning = `<svg xmlns="http://www.w3.org/2000/svg" width="256"
height="256" viewBox="0 0 256 256"><path fill="currentColor" d="M236.8
188.09L149.35 36.22a24.76 24.76 0 0 0-42.7 0L19.2 188.09a23.51 23.51 0 0 0 0
23.72A24.35 24.35 0 0 0 40.55 224h174.9a24.35 24.35 0 0 0 21.33-12.19a23.51
23.51 0 0 0 .02-23.72M120 104a8 8 0 0 1 16 0v40a8 8 0 0 1-16 0Zm8 88a12 12 0 1 1
12-12a12 12 0 0 1-12 12"/></svg>`;
const Error = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"
viewBox="0 0 256 256"><path fill="currentColor" d="m227.31
80.23l-51.54-51.54A16.13 16.13 0 0 0 164.45 24h-72.9a16.13 16.13 0 0 0-11.32
4.69L28.69 80.23A16.13 16.13 0 0 0 24 91.55v72.9a16.13 16.13 0 0 0 4.69
11.32l51.54 51.54A16.13 16.13 0 0 0 91.55 232h72.9a16.13 16.13 0 0 0
11.32-4.69l51.54-51.54a16.13 16.13 0 0 0 4.69-11.32v-72.9a16.13 16.13 0 0
0-4.69-11.32M120 80a8 8 0 0 1 16 0v56a8 8 0 0 1-16 0Zm8 104a12 12 0 1 1 12-12a12
12 0 0 1-12 12"/></svg>`;

export interface AlertSignature<E extends Element = HTMLDivElement> {
  Element: E;
  Args: {
    element?: ComponentLike<{ Element: HTMLElement }>;
    indicator?: Indicator;
    importance?: Importance;
    icon?: IconAsset;
    title?: string;
  };
  Blocks: {
    default?: [];
    title?: [];
    content?: [];
    actions?: [];
  };
}

export class Alert<E extends Element = HTMLDivElement> extends Component<AlertSignature<E>> {
  get icon() {
    if (this.args.icon) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return this.args.icon;
    }

    if (this.args.indicator === Indicator.Error) {
      return Error;
    }

    if (this.args.indicator === Indicator.Warning) {
      return Warning;
    }

    if (this.args.indicator === Indicator.Success) {
      return Success;
    }

    return Info;
  }

  get role() {
    if (this.args.indicator === Indicator.Success || this.args.indicator === Indicator.Warning) {
      return 'alert';
    }

    if (this.args.indicator === Indicator.Error) {
      return 'alertdialog';
    }
  }

  hasTitle = (titleBlock: boolean) => {
    return titleBlock || this.args.title;
  };

  <template>
    {{#let
      (if @element @element (element "div")) (this.hasTitle (has-block "title")) (uniqueId)
      as |Element titlePresent titleId|
    }}
      <Element
        class="alert"
        role={{this.role}}
        aria-labelledby={{if titlePresent titleId}}
        data-indicator={{if @indicator @indicator "neutral"}}
        data-importance={{if @importance @importance "supreme"}}
        data-test-feedback
        ...attributes
      >
        <Icon @icon={{this.icon}} part="icon" />

        {{#if titlePresent}}
          <span part="title" id={{titleId}}>
            {{#if (has-block "title")}}
              {{yield to="title"}}
            {{else if @title}}
              {{@title}}
            {{/if}}
          </span>
        {{/if}}

        <div part="content">
          {{#if (has-block "content")}}
            {{yield to="content"}}
          {{else}}
            {{yield}}
          {{/if}}
        </div>

        {{#if (has-block "actions")}}
          <div part="actions">
            {{yield to="actions"}}
          </div>
        {{/if}}
      </Element>
    {{/let}}
  </template>
}
