export function setContainerWidth(hooks: NestedHooks, width: number) {
  // eslint-disable-next-line @typescript-eslint/init-declarations
  let initialWidth: number;

  hooks.beforeEach(function () {
    let container = document.querySelector('#ember-testing') as HTMLDivElement;

    initialWidth = container.scrollWidth;

    Object.assign(container.style, {
      width: `${width.toString()}px`
    });
  });

  hooks.afterEach(function () {
    let container = document.querySelector('#ember-testing') as HTMLDivElement;

    Object.assign(container.style, {
      width: `${initialWidth.toString()}px`
    });
  });
}

export function setContainerHeight(hooks: NestedHooks, height: number) {
  // eslint-disable-next-line @typescript-eslint/init-declarations
  let initialHeight: number;

  hooks.beforeEach(function () {
    let container = document.querySelector('#ember-testing') as HTMLDivElement;

    initialHeight = container.scrollHeight;

    Object.assign(container.style, {
      height: `${height.toString()}px`
    });
  });

  hooks.afterEach(function () {
    let container = document.querySelector('#ember-testing') as HTMLDivElement;

    Object.assign(container.style, {
      height: `${initialHeight.toString()}px`
    });
  });
}

export function setContainerSize(hooks: NestedHooks, width: number, height: number) {
  setContainerWidth(hooks, width);
  setContainerHeight(hooks, height);
}
