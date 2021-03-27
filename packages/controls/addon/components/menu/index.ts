import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

export default class MenuComponent extends Component {
  id = guidFor(this);
}
