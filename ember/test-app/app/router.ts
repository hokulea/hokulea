/* eslint-disable @typescript-eslint/no-invalid-this */
import EmberRouter from '@ember/routing/router';

import config from '@hokulea/ember-classic-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('actions');
  this.route('content');
  this.route('controls', function () {
    this.route('composites');
  });
  this.route('forms');
  this.route('icons');
  this.route('windows');
});
