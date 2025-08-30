import './styles/app.css';

/* eslint-disable ember/no-at-ember-render-modifiers */
// @ts-expect-error filepath mismatch
import didInsert from '@ember/render-modifiers/addon/modifiers/did-insert';
// @ts-expect-error filepath mismatch
import didUpdate from '@ember/render-modifiers/addon/modifiers/did-update';
// @ts-expect-error filepath mismatch
import willDestroy from '@ember/render-modifiers/addon/modifiers/will-destroy';

import type { ModifierLike } from '@glint/template';

type RenderModifier = ModifierLike<{
  Element: Element;
  Args: {
    Positional: [
      callback: (element: Element, args: unknown[]) => unknown,
      ...callbackArgs: unknown[]
    ];
  };
}>;

import EmberRouter from '@ember/routing/router';

import EmberApp from 'ember-strict-application-resolver';

import '@hokulea/core/index.css';

import { hokuleaRegistry } from '../src/registry';

class Router extends EmberRouter {
  location = 'history';
  rootURL = '/';
}

Router.map(function () {
  /* eslint-disable @typescript-eslint/no-invalid-this */
  this.route('actions');
  this.route('content');
  this.route('controls', function () {
    this.route('composites');
  });
  this.route('forms');
  this.route('icons');
  this.route('windows');
  this.route('navigation', function () {
    this.route('list');
    this.route('app-header');
  });
  /* eslint-enable @typescript-eslint/no-invalid-this */
});

export default class App extends EmberApp {
  modules = {
    './router': { default: Router },

    // ...import.meta.glob('./services/**/*', { eager: true }),
    // ...import.meta.glob('./routes/*', { eager: true }),
    ...import.meta.glob('./templates/**/*', { eager: true }),

    // hokulea
    ...hokuleaRegistry(),

    // ember
    './modifiers/did-insert': didInsert as RenderModifier,
    './modifiers/did-update': didUpdate as RenderModifier,
    './modifiers/will-destroy': willDestroy as RenderModifier
  };
}
