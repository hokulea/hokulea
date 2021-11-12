# Token Specification

## Common Pieces

These are common pieces that will appear in one of the mentioned schemes on this
document.

`$state`

: Encode interactive states

- `base` - normal (without state)
- `active` - when an element is active (eg. pressed)
- `hover` - when the element is hovered
- `disabled` - when the element is disabled

`$category`

: The category in which this token belongs to, such as `color`, `typo`,
`shadow`, `sizing`, etc.

`$property`

: As a sub-group of category, be one of

- `background`
- `border`
- `text`
- `shadow` - allows `box.shadow` or `typo.shadow`

## Sizing

Sizing has two tokens to control it:

`sizing-ratio`

: the ratio parameter for modular scale.

`sizing-factor`

: parameter for fine control the root font-size

Check at [sizing](../foundation/sizing.md) for computed values from those parameters.

## Intentions

Tokens to express user intentions.

Scheme:

```txt
intent-$intent-$importance-$state-$category-$property
```

`$intent`

: One of the following:

- `action` - The goto action
- `alternative` - An alternative to the goto action
- `highlight` - If there are multiple options, this is the recommended one
- `danger` - A cautious action

`$importance`

: The visual weight to express the dominance of this element vs another

- `fill` (name tdb)
- `subtle`
- `plain` (name tdb)

<Demo::IntentTokens/>

## Emphasize

Tokens to emphasize based on their intent.

Scheme:

```txt
emphasize-$intent-$scale
```

`$intent`

: see above under [intentions](#intentions).

`$scale`

A scale from [-2,2] with an absolute zero at `0` and same sized steps into both directions.

## Indicators

Indicating feedback of happened interactions of aside hints and information.

Scheme:

```txt
indicator-$denotation-$obtrusion-$property
```

`$denotation`

: Denotes the indicator

- `success` - Use it to show something went successful with a message about what that was
- `info` - Display neutral/informative messages, such as auxilliary information as aside notes
- `warning` - Something operation wasn’t successful. The result might still be
  ok for further action. Attention is needed here.
- `error` - An operation went wrong. Inspect what was the problem and take action upon that.

## Structure
