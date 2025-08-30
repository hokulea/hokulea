import { LinkManagerService } from 'ember-link';
import PortalService from 'ember-stargate/services/-portal';
import { buildRegistry } from 'ember-strict-application-resolver/build-registry';

import HokuleaService from './services/-hokulea.ts';

export const hokuleaRegistry = buildRegistry({
  './services/-hokulea': HokuleaService,

  // external addons
  './services/link-manager': LinkManagerService,
  './services/-portal': PortalService
});
