# Indicators

Indicators are for any sort of feedback for user about instructions they made or
for information that have been made on behalf of them. Visual elements, are
badges, alerts, notifications, status texts, interactive colors (= think form
elements). In contrast to instructions, feedback is not interactive instead
stateless.

<Spec::Indicators/>

`$indicator`

: The kind of information

- `informative` (default) - any sort of feedback
- `success` - Something went well
- `warning` - Something was't successful, the result may still be ok, attention may needed (we let you know)
- `error` - Something want wrong. Inspect the problem and take action upon that

`$importance`

: How obtrusive this information is presented to users. refer to intents (?)

`$property`

: refer to the technical parts of [Token API](token-api.md)
