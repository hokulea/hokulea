import Route from '@ember/routing/route';
import { setupKolay } from 'kolay/setup';

import type { Manifest } from 'kolay';

export default class ApplicationRoute extends Route {
  async model(): Promise<Manifest> {
    return await setupKolay(this);
  }
}
