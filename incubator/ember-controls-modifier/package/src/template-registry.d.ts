import type { default as Control } from './modifiers/control';

export default interface EmberControlsModifierRegistry {
  control: typeof Control;
}
