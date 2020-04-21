import { action } from '@ember/object';
import Component from '@glimmer/component';

interface TextInputArgs {
  update: (value: string) => void;
}

export default class TextInputComponent extends Component<TextInputArgs> {
  @action
  update(event: InputEvent) {
    this.args.update?.((event.target as HTMLInputElement).value);
  }
}
