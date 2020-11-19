import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class ControlTestComponent extends Component {
  @tracked items = ['Banana', 'Apple', 'Strawberry'];
  @tracked selection: string[] = [];
  @tracked activeItem?: string;

  @action
  addItem(item: string) {
    this.items = [...this.items, item];
  }

  @action
  removeItem(item: string) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  @action
  selectByIndices(selection: number[]) {
    console.log('selectByIndices', selection);

    this.selection = this.items.filter((_name, index) =>
      selection.includes(index)
    );
  }

  @action
  activateItemByIndex(item: number) {
    console.log('activateItemByIndex', item);

    if (item !== undefined && item > -1 && item < this.items.length) {
      this.activeItem = this.items[item];
    }
  }

  @action
  select(selection: string[]) {
    console.log('select', selection);

    this.selection = selection;
  }

  @action
  activateItem(item: string) {
    console.log('activateItem', item);

    this.activeItem = item;
  }

  // mutate data
  append(item: string) {
    this.items = [...this.items, item];
  }

  @action
  remove(item: string) {
    if (this.items.includes(item)) {
      this.items.splice(this.items.indexOf(item), 1);
      this.items = this.items;
    }
  }

  @tracked value = '';

  @action
  update(event: InputEvent) {
    this.value = (event.currentTarget as HTMLInputElement).value;
  }

  @action
  add(event: Event) {
    this.append(this.value);
    this.value = '';

    event.preventDefault();
  }
}
