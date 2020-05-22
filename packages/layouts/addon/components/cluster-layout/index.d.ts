import Component from '@hokulea/component';

export interface ClusterLayoutArgs {
  /** A CSS `justify-content` value */
  justify: string;

  /** A CSS `align-items` value */
  align: string;
}

/**
 * Cluster Layout Component
 */
export default class ClusterLayoutComponent extends Component<
  ClusterLayoutArgs
> {}
