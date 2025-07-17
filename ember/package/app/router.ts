import EmberRouter from '@ember/routing/router';

import config from './config.ts';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
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
  /* eslint-enable @typescript-eslint/no-invalid-this */
});
