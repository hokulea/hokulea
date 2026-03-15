// this is here until this is part of an official TS release

type Double<A extends string, B extends string> = `${A} ${B}` | `${B} ${A}`;

type Group1 =
  | 'left'
  | 'center'
  | 'right'
  | 'span-left'
  | 'span-right'
  | 'x-start'
  | 'x-end'
  | 'span-x-start'
  | 'span-x-end'
  | 'self-x-start'
  | 'self-x-end'
  | 'span-self-x-start'
  | 'span-self-x-end'
  | 'span-all';
type Group2 =
  | 'top'
  | 'center'
  | 'bottom'
  | 'span-top'
  | 'span-bottom'
  | 'y-start'
  | 'y-end'
  | 'span-y-start'
  | 'span-y-end'
  | 'self-y-start'
  | 'self-y-end'
  | 'span-self-y-start'
  | 'span-self-y-end'
  | 'span-all';

type Group3 =
  | 'block-start'
  | 'center'
  | 'block-end'
  | 'span-block-start'
  | 'span-block-end'
  | 'span-all';
type Group4 =
  | 'inline-start'
  | 'center'
  | 'inline-end'
  | 'span-inline-start'
  | 'span-inline-end'
  | 'span-all';

type Group5 =
  | 'self-block-start'
  | 'self-block-end'
  | 'span-self-block-start'
  | 'span-self-block-end'
  | 'span-all';
type Group6 =
  | 'self-inline-start'
  | 'self-inline-end'
  | 'span-self-inline-start'
  | 'span-self-inline-end'
  | 'span-all';
type Group7 = 'start' | 'center' | 'end' | 'span-start' | 'span-end' | 'span-all';
type Group8 =
  | 'self-start'
  | 'center'
  | 'self-end'
  | 'span-self-start'
  | 'span-self-end'
  | 'span-all';

export type PositionArea =
  | Double<Group1, Group2>
  | Double<Group3, Group4>
  | Double<Group5, Group6>
  | Group7
  | Double<Group7, Group7>
  | Group8
  | Double<Group8, Group8>;
