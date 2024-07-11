import 'ember-source/types';
import 'ember-source/types/preview';
import '@glint/environment-ember-loose';

import type AriaVoyagerRegistry from 'ember-aria-navigator/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends AriaVoyagerRegistry /* other addon registries */ {
    // local entries
  }
}
