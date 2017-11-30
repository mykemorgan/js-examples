### Simple transaction processing example in Javascript


### "Requirements"

##### Input Operations:

- `Add` `name` `card` `amount`
- `Charge` `name` `amount`
- `Credit` `name` `amount`
- Amounts prefixed with `$` and whole numbers only

##### Output

- One line per person
- Written to stdout
- Name of person, colon, and their balance (or "error" if `Add`ed card was bad)
- Names sorted alphabetically

##### Luhn 10 verification

[Luhn 10 explanation](https://en.wikipedia.org/wiki/Luhn_algorithm)

