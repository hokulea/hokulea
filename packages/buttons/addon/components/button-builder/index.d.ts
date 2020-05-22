import Component, { Template } from '@hokulea/component';

type ElementHelper = string;

export interface ButtonArgs {
  element: ElementHelper;
}

export interface ButtonBuilder {
  Content: Template;
  Affix: Template;
  Prefix: Template;
  Suffix: Template;
}

export interface ButtonYield {
  (builder: ButtonBuilder): Template;
}

export default class ButtonBuilderComponent extends Component<
  ButtonArgs,
  ButtonYield
> {}
