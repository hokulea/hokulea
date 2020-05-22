import Component from '@hokulea/component';

export interface SidebarArgs {
  /** Minimum value vor the content, default is 50% */
  min: string;

  /** Space between sidebar and content, default is var(--s1) */
  space: string;
}

/**
 *
 */
export default class SidebarLayoutComponent extends Component<SidebarArgs> {}
