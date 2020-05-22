import Component from '@hokulea/component';

export interface SwitcherLayoutArgs {
  /** Threshold at which the it wraps from horizontal to vertical, default is var(--measure) */
  threshold?: string;

  /** Space between the elements, default is var(--s1) */
  space?: string;

  /** The number of elements that switch from horizontal to vertical layout,
   * default is 3 */
  limit?: number;
}

export default class SwitcherLayoutComponent extends Component<
  SwitcherLayoutArgs
> {}
