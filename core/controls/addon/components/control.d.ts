export interface Control<T> {
  value: T;
  update: (value: T | undefined) => void;
}

export interface Multiple {
  multiple?: boolean;
}
