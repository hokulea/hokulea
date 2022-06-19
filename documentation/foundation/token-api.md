# Token API

A Token API is described through multiple [token
specification](https://theemo.io/knowledge-base/token-specification) - one for
each foundation subsystem. A token specification is a formula for scalable
design tokens. Design tokens become scalable when they are replicatable.

The Token API acts as contract for themes made for hokulea.

## Technical Parts

These are common pieces that will appear in one of the mentioned schemes on this
document.

`$state`

: Encode interactive states

- `base` - normal (without state)
- `active` - when an element is active (eg. pressed)
- `hover` - when the element is hovered
- `disabled` - when the element is disabled

`$property`

: A property for which the design token is used, for example:

- `background`
- `border`
- `text`
- `shadow` (`box-shadow` or `text-shadow`)
- ...

`$type`

: The type represents the value of a design token. Can be single value types, such as `color`,
`dimension` or composite value types, such as `border`, `shadow` or `typography`
as defined in the [Design Tokens Format Module](https://tr.designtokens.org/format).

## Semantic Patterns

- importance (tbd)
