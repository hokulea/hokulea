import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';

export default class HokuleaService extends Service {
  @tracked pageLevel = 0;
}
