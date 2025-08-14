// /* eslint-disable ember/no-at-ember-render-modifiers */
// // @ts-expect-error filepath mismatch
// import didInsert from '@ember/render-modifiers/addon/modifiers/did-insert';
// // @ts-expect-error filepath mismatch
// import didUpdate from '@ember/render-modifiers/addon/modifiers/did-update';
// // @ts-expect-error filepath mismatch
// import willDestroy from '@ember/render-modifiers/addon/modifiers/will-destroy';

// import type { ModifierLike } from '@glint/template';

// type RenderModifier = ModifierLike<{
//   Element: Element;
//   Args: {
//     Positional: [
//       callback: (element: Element, args: unknown[]) => unknown,
//       ...callbackArgs: unknown[]
//     ];
//   };
// }>;

import config from './config';
import Router from './router.ts';

import type { ImportGlobFunction } from 'vite/types/importGlob.js';

function formatAsResolverEntries(imports: ReturnType<ImportGlobFunction>) {
  return Object.fromEntries(
    Object.entries(imports).map(([k, v]) => [
      k.replace(/\.g?(j|t)s$/, '').replace(/^\.\//, `${config.modulePrefix}/`),
      v
    ])
  );
}

/**
 * A global registry is needed until:
 * - Services can be referenced via import paths (rather than strings)
 * - we design a new routing system
 */
const appRegistry = {
  ...formatAsResolverEntries(import.meta.glob('./templates/**/*.{gjs,gts,js,ts}', { eager: true })),
  ...formatAsResolverEntries(import.meta.glob('./services/**/*.{js,ts}', { eager: true })),
  ...formatAsResolverEntries(import.meta.glob('./routes/**/*.{js,ts}', { eager: true })),
  [`${config.modulePrefix}/router`]: Router
};

const emberRegistry = {
  // [`${config.modulePrefix}/modifiers/did-insert`]: didInsert as RenderModifier,
  // [`${config.modulePrefix}/modifiers/did-update`]: didUpdate as RenderModifier,
  // [`${config.modulePrefix}/modifiers/will-destroy`]: willDestroy as RenderModifier
};

const addonRegistry = {
  // [`${config.modulePrefix}/services/link-manager`]: LinkManagerService,
  // [`${config.modulePrefix}/services/-portal`]: PortalService
};

export const registry = {
  ...emberRegistry,
  ...appRegistry,
  ...addonRegistry
};
