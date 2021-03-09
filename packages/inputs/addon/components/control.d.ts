export interface Control<T> {
  value: T;
  update: (value: T) => void;
}

export interface Multiple {
  multiple?: boolean;
}
