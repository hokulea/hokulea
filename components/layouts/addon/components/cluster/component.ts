import Component from '@glimmer/component';

interface ClusterArgs {
  /** A CSS `justify-content` value */
  justify: string;
  /** A CSS `align-items` value */
  align: string;
}

/**
 * A cluster layout component to a group of elements that are liable to wrap.
 * Such as: A list of tags, keywords,
 */
export default class ClusterComponent extends Component<ClusterArgs> {
  get style() {
    return {
      justifyContent: this.args.justify ?? 'flex-start',
      alignItems: this.args.align ?? 'center'
    };
  }
}
