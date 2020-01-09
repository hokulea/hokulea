export interface StyleRef {
  from: {
    id: string;
    name: string;
  };
  to: {
    id: string;
    name: string;
  };
}

export interface RefNode {
  node: string;
  fill?: StyleRef;
  stroke?: StyleRef;
  effect?: StyleRef;
}

export interface References {
  document: {
    id: string;
    name: string;
  },
  nodes: RefNode[]
}