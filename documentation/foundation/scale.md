# Scaling System

Hokulea uses [modular scale](https://every-layout.dev/rudiments/modular-scale/)
for achieving visual harmony. A modular scale is available globally and locally.
They are identical in the way they work, they have different bases.

Formula is:

```txt
scale(n) = base * ratio ^ n
```

The logarithmic scaling can be controlled through a design token
(`scale-ratio`). The base refers to different `font-size`, which means the
sizing can be adjusted by only setting `font-size`.

## Global Scaling

The global scaling system is the primer usage. The _base_ is the `font-size`
of `:root` - the browsers default font size (usually `16px`). A user may
change this for better readability/accessibility reasons. This user preference
is taken into account.

The default `font-size` hokulea uses for `:root` is:

```css
:root {
  font-size: calc(0.5vw + 1em * var(--factor));
}
```

- `1em` respects the user preference
- `0.5vw` adapts to the given viewport
- `--factor` a factor for fine control (use `--scale-factor` to adjust it, default is
  `0.8`)

With `1em` as `16px`, here are some sample font sizes at given viewport widths:

- `width: 576px` = `15.68px`
- `width: 1200px` = `18.8px`
- `width: 1400px` = `19.8px`

Hokulea ships with computed tokens for positive and negative scaling:

- `--s-4: scale(-4)`
- `--s-3: scale(-3)`
- `--s-2: scale(-2)`
- `--s-1: scale(-1)`
- `--s0: scale(0)` - the default value (see `font-size` mentinoed above)
- `--s1: scale(1)`
- `--s2: scale(2)`
- `--s3: scale(3)`
- `--s4: scale(4)`

### Global Demo

<Demo::GlobalScale/>

## Local Scaling

Local scaling is used to size specific elements. The _base_ is the `font-size`
of the respective element (`font-size` of the actual element, the parent element
... all the way up to the body).

Also there are computed tokens available for local scaling:

- `--ls-4: scale(-4)`
- `--ls-3: scale(-3)`
- `--ls-2: scale(-2)`
- `--ls-1: scale(-1)`
- `--ls0: scale(0)` - the default value
- `--ls1: scale(1)`
- `--ls2: scale(2)`
- `--ls3: scale(3)`
- `--ls4: scale(4)`

### Local Demo

<Demo::LocalScale/>
