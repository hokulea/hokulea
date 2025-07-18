import type HokuleaRegistry from '../src/template-registry';
import type EmberElementHelperRegistry from 'ember-element-helper/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends HokuleaRegistry, EmberElementHelperRegistry {}
}
