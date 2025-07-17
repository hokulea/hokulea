export function setContainerWidth(hooks: NestedHooks, width: number) {
  let initialWidth: number;

  hooks.beforeEach(function () {
    const container = document.querySelector('#ember-testing') as HTMLDivElement;

    initialWidth = container.scrollWidth;

    Object.assign(container.style, {
      width: `${width.toString()}px`
    });
  });

  hooks.afterEach(function () {
    const container = document.querySelector('#ember-testing') as HTMLDivElement;

    Object.assign(container.style, {
      width: `${initialWidth.toString()}px`
    });
  });
}

export function setContainerHeight(hooks: NestedHooks, height: number) {
  let initialHeight: number;

  hooks.beforeEach(function () {
    const container = document.querySelector('#ember-testing') as HTMLDivElement;

    initialHeight = container.scrollHeight;

    Object.assign(container.style, {
      height: `${height.toString()}px`
    });
  });

  hooks.afterEach(function () {
    const container = document.querySelector('#ember-testing') as HTMLDivElement;

    Object.assign(container.style, {
      height: `${initialHeight.toString()}px`
    });
  });
}

export function setContainerSize(hooks: NestedHooks, width: number, height: number) {
  setContainerWidth(hooks, width);
  setContainerHeight(hooks, height);
}
