import Route from "@ember/routing/route";
import { inject as service } from '@ember/service';
import MakeupService from 'ember-makeup/services/makeup';

export default class ApplicationRoute extends Route {
  @service makeup!: MakeupService;

  beforeModel() {
    this.makeup.setTheme('moana');

    window.makeup = this.makeup;
  }
}
