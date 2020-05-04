# Scaling System

Hokulea uses [modular scale](https://every-layout.dev/rudiments/modular-scale/)
which is explained excellently on [every-layout.dev](https://every-layout.dev).
Hokulea support global and local scaling systems. They are identical in the way
they work, they hook into different bases.

Formula is:

```txt
val(n) = base * scale-ratio ^ n
```

The logarithmic scaling can be controlled through design tokens by each
theme. There is a `scale-ratio` and a `base` value for _global_ and _local_ scaling.

`scale-ratio`
: The exponent ratio at which the values scale. Default is `1.4`

## Global Scaling

The global scaling system is the primer usage.

`scale-base`
: Base value for global scaling. Default value is `0.8rem` and is based on your
browsers default font size (usually `16px`).

Hokulea ships with custom CSS properties for positive and negative scaling:

- `--s-4: val(-4)`
- `--s-3: val(-3)`
- `--s-2: val(-2)`
- `--s-1: val(-1)`
- `--s0: val(0)` - the default value
- `--s1: val(1)`
- `--s2: val(2)`
- `--s3: val(3)`
- `--s4: val(4)`

## Local Scaling

Local scaling is used to size specific elements.

`scale-base-local`
: Base value for local scaling. Default value is `0.8em` and is based on the
`font-size` if your current element.

Also there are local scaling custom CSS properties ready:

- `--ls-4: val(-4)`
- `--ls-3: val(-3)`
- `--ls-2: val(-2)`
- `--ls-1: val(-1)`
- `--ls0: val(0)` - the default value
- `--ls1: val(1)`
- `--ls2: val(2)`
- `--ls3: val(3)`
- `--ls4: val(4)`
