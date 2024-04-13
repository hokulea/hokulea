import { LinkTo } from '@ember/routing';

import Route from 'ember-polaris-routing/route';
import CompatRoute from 'ember-polaris-routing/route/compat';

export class ApplicationRoute extends Route<object> {
  <template>
    <header>
      Hokulea

      <nav>
        <LinkTo @route='actions'>Actions</LinkTo>
        <LinkTo @route='content'>Content</LinkTo>
        <LinkTo @route='controls'>Controls</LinkTo>
        <LinkTo @route='aria'>Aria</LinkTo>
        <LinkTo @route='forms'>Forms</LinkTo>
        <LinkTo @route='icons'>Icons</LinkTo>
      </nav>
    </header>

    <main>
      {{outlet}}
    </main>
  </template>
}

export default CompatRoute(ApplicationRoute);
