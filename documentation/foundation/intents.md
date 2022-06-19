# Intents

Instructions are any form of action a user will do in order to change something
in the system. Visually speaking buttons, links, menus, menu-items, etc. Those
instructions follow a certain intent the customer is about to do. Instructions
are interactive, meaning they contain the interactive states.

To use these tokens, you first pick what kind of intent a user will do and
second is to pick how important this intent is.

<Spec::Intents />

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

`$property` and `$type`

: refer to the technical parts of [Token API](token-api.md)

## Token Reference

Find the [reference for all intent tokens](../tokens/intents.md).
