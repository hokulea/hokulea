import Component, { Template } from '@hokulea/component';

export interface CardYield {
  (): Template;
  header: () => Template;
  content: () => Template;
  footer: () => Template;
}

export default class CardComponent extends Component<{}, CardYield> {}
