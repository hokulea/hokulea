---
id: Documentation|Foundation/Scale
title: Scaling System
---

Hokulea uses [modular scale](https://every-layout.dev/rudiments/modular-scale/)
which is explained excellently on [every-layout.dev](https://every-layout.dev).
The logarithmic scaling can be controlled through two design tokens by each theme:

`scale-base`
: Base value for scaling. Default value is `0.8rem` and is based on your
browsers default font size (usually `16px`).

`scale-ratio`
: The exponent at which the values scale. Default is `1.4`

Formulae are:

```txt
pos(n) = scale-base * scale-ratio ^ n
neg(n) = scale-base * scale-ratio ^ (1/n)
```

Hokulea ships with custom CSS properties for positive and negative scaling:

- `--s-4: neg(4)`
- `--s-3: neg(3)`
- `--s-2: neg(2)`
- `--s-1: neg(1)`
- `--s0: pos(0)` - the default value
- `--s1: pos(1)`
- `--s2: pos(2)`
- `--s3: pos(3)`
- `--s4: pos(4)`
