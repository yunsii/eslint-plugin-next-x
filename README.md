# starter-eslint-plugin

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Starter template for eslint plugin

## Usages

### Install

```bash
npm i -D starter-eslint-plugin
```

### Configure

We recommend using [ESLint's Flat Config format](https://eslint.org/docs/latest/use/configure/configuration-files-new).

```ts
// eslint.config.js
import starter from 'starter-eslint-plugin'

export default [
  {
    plugins: {
      starter,
    },
    rules: {
      'starter/no-loop-over-enum': 'warn',
    },
  },
]
```

## Rules

💭 Requires [type information](https://typescript-eslint.io/linting/typed-linting).

| Name                                                 | Description               | 💭  |
| :--------------------------------------------------- | :------------------------ | :-- |
| [no-loop-over-enum](docs/rules/no-loop-over-enum.md) | Avoid looping over enums. | 💭  |

## Credits

Thanks to the existing works for references and inspiration.

- [eslint-plugin-format](https://github.com/antfu/eslint-plugin-format)

## License

[MIT](./LICENSE) License © 2024-PRESENT [Yuns](https://github.com/yunsii)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/starter-eslint-plugin?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/starter-eslint-plugin
[npm-downloads-src]: https://img.shields.io/npm/dm/starter-eslint-plugin?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/starter-eslint-plugin
[bundle-src]: https://img.shields.io/bundlephobia/minzip/starter-eslint-plugin?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=starter-eslint-plugin
[license-src]: https://img.shields.io/github/license/antfu/starter-eslint-plugin.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/antfu/starter-eslint-plugin/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/starter-eslint-plugin
