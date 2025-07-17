// import EmberApp from '@ember/application';
// import EmberRouter from '@ember/routing/router';

// import Resolver from 'ember-resolver';
// // import RouteTemplate from 'ember-route-template';

// class Router extends EmberRouter {
//   location = 'none';
//   rootURL = '/';
// }

// Router.map(function () {
//   /* eslint-disable @typescript-eslint/no-invalid-this */
//   this.route('actions');
//   this.route('content');
//   this.route('controls', function () {
//     this.route('composites');
//   });
//   this.route('forms');
//   this.route('icons');
//   this.route('windows');
//   /* eslint-enable @typescript-eslint/no-invalid-this */
// });

// class TestApp extends EmberApp {
//   modulePrefix = 'test-app';
//   Resolver = Resolver.withModules({
//     'test-app/router': { default: Router }
//   });
// }
import { setApplication } from '@ember/test-helpers';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';
import { setupEmberOnerrorValidation, start as qunitStart } from 'ember-qunit';

import TestApp from '#app/app.ts';

export function start() {
  setApplication(
    TestApp.create({
      autoboot: false,
      rootElement: '#ember-testing'
    })
  );

  // eslint-disable-next-line import-x/namespace
  setup(QUnit.assert);
  setupEmberOnerrorValidation();
  qunitStart();
}
