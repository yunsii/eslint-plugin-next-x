# Avoid looping over enums (`no-loop-over-enum`)

💭 This rule requires [type information](https://typescript-eslint.io/linting/typed-linting).

<!-- end auto-generated rule header -->

Example rule that demonstrates banning `for-in` looping over `enum`s.

## Valid

```ts
const values1 = {}
for (const a in values1) {
  // ...
}
```

```ts
const values2: string[] = []
for (const a of values2) {
  // ...
}
```

## Invalid

```ts
enum Values {}
for (const a in Values) {
  // ...
}
```
