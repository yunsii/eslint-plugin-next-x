# eslint-plugin-next-x

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Starter template for eslint plugin

## Usages

### Install

```bash
npm i -D eslint-plugin-next-x
```

### Configure

We recommend using [ESLint's Flat Config format](https://eslint.org/docs/latest/use/configure/configuration-files-new).

```ts
// eslint.config.js
import nextX from 'eslint-plugin-next-x'

export default [
  {
    plugins: {
      'next-x': nextX,
    },
    rules: {
      'next-x/require-get-server-side-props': 'warn',
    },
  },
]
```

## Rules

| Name                                                                         | Description                 | 💭  |
| :--------------------------------------------------------------------------- | :-------------------------- | :-- |
| [require-get-server-side-props](docs/rules/require-get-server-side-props.md) | Required getServerSideProps |     |

## License

[MIT](./LICENSE) License © 2024-PRESENT [Yuns](https://github.com/yunsii)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/eslint-plugin-next-x?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/eslint-plugin-next-x
[npm-downloads-src]: https://img.shields.io/npm/dm/eslint-plugin-next-x?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/eslint-plugin-next-x
[bundle-src]: https://img.shields.io/bundlephobia/minzip/eslint-plugin-next-x?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=eslint-plugin-next-x
[license-src]: https://img.shields.io/github/license/antfu/eslint-plugin-next-x.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/antfu/eslint-plugin-next-x/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/eslint-plugin-next-x
