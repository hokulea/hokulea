export interface Package {
  makeup: {
    name: string;
    sync?: SyncOptions;
  };
}

export interface SyncOptions {
  contextPrefix?: string;
  color?: string;
  colorAlpha?: string;
  transforms?: {
    [key: string]: string;
  };
}
