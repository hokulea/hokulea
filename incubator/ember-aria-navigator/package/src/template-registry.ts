import type listbox from './modifiers/listbox';
import type menu from './modifiers/menu';

export default interface AriaVoyagerRegistry {
  listbox: typeof listbox;
  menu: typeof menu;
}
