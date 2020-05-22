import GlimmerComponent from '@glimmer/component';

/** Just to have a distinct type - dunno what is the correct one */
export type Template = any;

interface DefaultOutput {
  (): Template;
}

interface BlocksOutput {
  [block: string]: () => Template;
}

type Output = DefaultOutput & BlocksOutput;

export default class Component<Input = {}, Output = DefaultOutput> extends GlimmerComponent<Input> { }