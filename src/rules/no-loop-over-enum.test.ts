import path from 'node:path'

import { $, run } from 'eslint-vitest-rule-tester'
import * as tsParser from '@typescript-eslint/parser'

import { rule } from './no-loop-over-enum'

run({
  name: 'no-loop-over-enum',
  rule,
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      projectService: {
        allowDefaultProject: ['*.ts*'],
        defaultProject: 'tsconfig.json',
      },
      tsconfigRootDir: path.join(__dirname, '../..'),
    },
  },
  valid: [
    `enum Values {}`,
    `for (const a in []) {}`,
    `for (const a of []) {}`,
    $`
      const values = {};
      for (const a in values) {}
    `,
    $`
      const values = [];
      for (const a of values) {}
    `,
  ],
  invalid: [
    {
      code: $`
        enum Values {}
        for (const a in Values) {}
      `,
      errors: [
        {
          column: 17,
          endColumn: 23,
          line: 2,
          endLine: 2,
          messageId: 'loopOverEnum',
        },
      ],
    },
  ],
})
