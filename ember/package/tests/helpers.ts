import { skip, test } from 'qunit';
import {
  setupApplicationTest as upstreamSetupApplicationTest,
  setupRenderingTest as upstreamSetupRenderingTest,
  setupTest as upstreamSetupTest
} from 'ember-qunit';

import type { Resolver } from '@ember/owner';

// @ts-expect-error this __CI__ is set by vite at build time
export const testButNotOnCI = __CI__ ? skip : test;

interface SetupTestOptions {
  /**
   * The resolver to use when instantiating container-managed entities in the test.
   */
  resolver?: Resolver | undefined;
}

// This file exists to provide wrappers around ember-qunit's / ember-mocha's
// test setup functions. This way, you can easily extend the setup that is
// needed per test type.

export function setupApplicationTest(hooks: NestedHooks, options?: SetupTestOptions) {
  upstreamSetupApplicationTest(hooks, options);

  // Additional setup for application tests can be done here.
  //
  // For example, if you need an authenticated session for each
  // application test, you could do:
  //
  // hooks.beforeEach(async function () {
  //   await authenticateSession(); // ember-simple-auth
  // });
  //
  // This is also a good place to call test setup functions coming
  // from other addons:
  //
  // setupIntl(hooks); // ember-intl
  // setupMirage(hooks); // ember-cli-mirage
}

export function setupRenderingTest(hooks: NestedHooks, options?: SetupTestOptions) {
  upstreamSetupRenderingTest(hooks, options);

  // Additional setup for rendering tests can be done here.
}

export function setupTest(hooks: NestedHooks, options?: SetupTestOptions) {
  upstreamSetupTest(hooks, options);

  // Additional setup for unit tests can be done here.
}

export function setContainerWidth(hooks: NestedHooks, width: number) {
  let initialWidth: number;

  hooks.beforeEach(function () {
    const container = document.querySelector('#ember-testing') as HTMLDivElement;

    initialWidth = container.scrollWidth;

    Object.assign(container.style, {
      width: `${width.toString()}px`
    });
  });

  hooks.afterEach(function () {
    const container = document.querySelector('#ember-testing') as HTMLDivElement;

    Object.assign(container.style, {
      width: `${initialWidth.toString()}px`
    });
  });
}

export function setContainerHeight(hooks: NestedHooks, height: number) {
  let initialHeight: number;

  hooks.beforeEach(function () {
    const container = document.querySelector('#ember-testing') as HTMLDivElement;

    initialHeight = container.scrollHeight;

    Object.assign(container.style, {
      height: `${height.toString()}px`
    });
  });

  hooks.afterEach(function () {
    const container = document.querySelector('#ember-testing') as HTMLDivElement;

    Object.assign(container.style, {
      height: `${initialHeight.toString()}px`
    });
  });
}

export function setContainerSize(hooks: NestedHooks, width: number, height: number) {
  setContainerWidth(hooks, width);
  setContainerHeight(hooks, height);
}
