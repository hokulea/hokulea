import Component from '@glimmer/component';

interface TextInputArgs {
  update: (value: string) => void;
}

export default class TextInputComponent extends Component<TextInputArgs> {}
