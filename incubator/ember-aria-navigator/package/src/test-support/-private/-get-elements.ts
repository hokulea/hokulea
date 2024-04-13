import { getRootElement } from '@ember/test-helpers';

import {
  type IDOMElementDescriptor,
  lookupDescriptorData,
  resolveDOMElements
} from 'dom-element-descriptors';

function getElements(target: string): NodeListOf<Element>;
function getElements(target: string | IDOMElementDescriptor): Iterable<Element>;
/**
  Used internally by the DOM interaction helpers to find multiple elements.

  @private
  @param {string} target the selector to retrieve
  @returns {NodeList} the matched elements
*/
function getElements(
  target: string | IDOMElementDescriptor
): NodeListOf<Element> | Iterable<Element> {
  if (typeof target === 'string') {
    let rootElement = getRootElement();

    return rootElement.querySelectorAll(target);
  } else {
    let descriptorData = lookupDescriptorData(target);

    if (descriptorData) {
      return resolveDOMElements(descriptorData);
    } else {
      throw new Error('Must use a selector string or DOM element descriptor');
    }
  }
}

export default getElements;
