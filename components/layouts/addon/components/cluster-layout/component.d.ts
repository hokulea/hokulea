import Component from '@glimmer/component';

export interface ClusterLayoutArgs {
  /** A CSS `justify-content` value */
  justify: string;

  /** A CSS `align-items` value */
  align: string;
}

export default class ClusterLayoutComponent extends Component<
  ClusterLayoutArgs
> {}
