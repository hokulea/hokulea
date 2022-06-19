// this is NOT `tokens` - but I don't have a better name for now 😢

export enum Intent {
  Action = 'action',
  Alternative = 'alternative',
  Highlight = 'highlight',
  Danger = 'danger'
}

export enum Importance {
  /** name tbd */
  Fill = 'fill',
  Subtle = 'subtle',
  /** maybe: name tbd */
  Plain = 'plain'
}

export enum Indicator {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error'
}

// names for all props tbd !!!
export enum Obtrusion {
  Fill = 'fill',
  Box = 'box',
  Plain = 'plain'
}
