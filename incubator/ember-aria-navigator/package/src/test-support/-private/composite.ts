export function getItems(parent: HTMLElement, selector: string): HTMLElement[] {
  return [...parent.querySelectorAll(selector)] as HTMLElement[];
}
