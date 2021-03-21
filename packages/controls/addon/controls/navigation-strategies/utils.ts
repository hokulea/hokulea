function isItemInHorizontalViewport(container: HTMLElement, item: HTMLElement) {
  const buffer = 2;
  return (
    container.scrollLeft + container.clientWidth >= item.offsetLeft + buffer ||
    container.scrollLeft + buffer <= item.offsetLeft + item.clientWidth
  );
}

export function scrollLeftwardsToItem(
  container: HTMLElement,
  item: HTMLElement
): void {
  if (!isItemInHorizontalViewport(container, item) || item.offsetLeft === 0) {
    // eslint-disable-next-line no-param-reassign
    container.scrollLeft = item.offsetLeft;
  }
}

export function scrollRightwardsToItem(
  container: HTMLElement,
  item: HTMLElement
): void {
  if (!isItemInHorizontalViewport(container, item)) {
    // eslint-disable-next-line no-param-reassign
    container.scrollLeft =
      item.offsetLeft - container.clientWidth + item.clientWidth;
  }
}

function isItemInVerticalViewport(container: HTMLElement, item: HTMLElement) {
  const buffer = 2;
  return (
    container.scrollTop + container.clientHeight >= item.offsetTop + buffer ||
    container.scrollTop + buffer <= item.offsetTop + item.clientHeight
  );
}

export function scrollUpwardsToItem(
  container: HTMLElement,
  item: HTMLElement
): void {
  if (!isItemInVerticalViewport(container, item) || item.offsetTop === 0) {
    // eslint-disable-next-line no-param-reassign
    container.scrollTop = item.offsetTop;
  }
}

export function scrollDownwardsToItem(
  container: HTMLElement,
  item: HTMLElement
): void {
  if (!isItemInVerticalViewport(container, item)) {
    // eslint-disable-next-line no-param-reassign
    container.scrollTop =
      item.offsetTop - container.clientHeight + item.clientHeight;
  }
}
