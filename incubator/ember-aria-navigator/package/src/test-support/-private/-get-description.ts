import { isDescriptor, lookupDescriptorData } from 'dom-element-descriptors';

import type { Target } from '@ember/test-helpers';

/**
  Used internally by the DOM interaction helpers to get a description of a
  target for debug/error messaging.

  @private
  @param {Target} target the target
  @returns {string} a description of the target
*/
export default function getDescription(target: Target): string {
  let data = isDescriptor(target) ? lookupDescriptorData(target) : null;

  if (data) {
    return data.description || '<unknown descriptor>';
  } else {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    return target.toString();
  }
}
