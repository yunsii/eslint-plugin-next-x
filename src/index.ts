import module from 'node:module'

import { rules } from './rules/index.js'

const require = module.createRequire(import.meta.url)

const { name, version }
  // `import`ing here would bypass the TSConfig's `"rootDir": "src"`
  = require('../package.json') as typeof import('../package.json')

const plugin = {
  configs: {
    get recommended() {
      // eslint-disable-next-line ts/no-use-before-define
      return recommended
    },
  },
  meta: { name, version },
  rules,
}

const recommended = {
  plugins: {
    'next-x': plugin,
  },
  rules,
}

export default plugin
