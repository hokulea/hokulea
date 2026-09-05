/** @type {Partial<import("typedoc").TypeDocOptions>} */
export default {
  // entryPoints: ['src/**/*.gts'],
  outputs: [
    {
      name: 'json',
      path: './docs/structure.json'
    }
  ],
  plugin: ['typedoc-plugin-ember']
};
