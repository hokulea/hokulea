import EmberRouter from '@ember/routing/router';

import config from './config.ts';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  // routes go here
});
