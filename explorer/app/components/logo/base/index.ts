import Component from '@glimmer/component';

import styles from './index.css';

interface LogoBaseSignature {
  // The arguments accepted by the component
  Args: {};
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class LogoBaseComponent extends Component<LogoBaseSignature> {
  styles = styles;
}
