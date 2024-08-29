import janna from '@jannajs/lint/eslint'
import starter from 'starter-eslint-plugin'
import * as tsParser from '@typescript-eslint/parser'
import { GLOB_SRC } from '@antfu/eslint-config'

export default janna({}, {
  files: [GLOB_SRC],
  languageOptions: {
    parser: tsParser,
    // ref: https://typescript-eslint.io/packages/parser/#configuration
    parserOptions: {
      projectService: true,
    } satisfies tsParser.ParserOptions,
  },
  plugins: {
    starter,
  },
  rules: {
    'starter/no-loop-over-enum': ['error'],
  },
  ignores: [
    // TS code block in markdown
    '**/*.md/*.ts',
  ],
})
