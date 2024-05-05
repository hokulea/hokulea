import { Menu } from 'aria-navigator';
import { modifier } from 'ember-modifier';

export interface MenuSignature {
  Element: HTMLElement;
  Args: {
    Positional: [];
    Named: object;
  };
}

const menu = modifier<MenuSignature>((element) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  new Menu(element);
});

export default menu;
