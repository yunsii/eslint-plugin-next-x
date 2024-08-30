import { $, run } from 'eslint-vitest-rule-tester'
import * as tsParser from '@typescript-eslint/parser'

import { rule } from './require-get-server-side-props'

run({
  name: 'require-get-server-side-props',
  rule,
  languageOptions: {
    parser: tsParser,
  },
  valid: [
    'export const getServerSideProps = () => {}',
    'export function getServerSideProps() {}',
    $`
      export default function Page  ()  {}
      export const getServerSideProps = () => {}
    `,
    {
      code: `export const getServerSideProps = getServerSideData()(() => {})`,
      options: {
        style: {
          declarator: 'variable',
          callExpressionName: 'getServerSideData',
        },
      },
    },
  ],
  invalid: [
    {
      code: `export const getServerSideProps = () => {}`,
      options: {
        style: {
          declarator: 'variable',
          callExpressionName: 'getServerSideData',
        },
      },
      errors: [
        {
          column: 1,
          endColumn: 43,
          line: 1,
          endLine: 1,
          messageId: 'requiredGetServerSidePropsWithCallExpressionName',
        },
      ],
    },
    {
      code: `export function getServerSideProps() {}`,
      options: {
        style: {
          declarator: 'variable',
          callExpressionName: 'getServerSideData',
        },
      },
      errors: [
        {
          column: 1,
          endColumn: 40,
          line: 1,
          endLine: 1,
          messageId: 'requiredGetServerSidePropsWithCallExpressionName',
        },
      ],
    },
    {
      code: `export const getServerSideProps = getServerSideDataCopy()(() => {})`,
      options: {
        style: {
          declarator: 'variable',
          callExpressionName: 'getServerSideData',
        },
      },
      errors: [
        {
          column: 1,
          endColumn: 68,
          line: 1,
          endLine: 1,
          messageId: 'requiredGetServerSidePropsWithCallExpressionName',
        },
      ],
    },
    {
      code: 'export default function Page  ()  {}',
      errors: [
        {
          column: 1,
          endColumn: 37,
          line: 1,
          endLine: 1,
          messageId: 'requiredGetServerSideProps',
        },
      ],
    },
    {
      code: $`
        export default function Page  ()  {
          return null
        }
      `,
      errors: [
        {
          column: 1,
          endColumn: 2,
          line: 1,
          endLine: 3,
          messageId: 'requiredGetServerSideProps',
        },
      ],
    },
  ],
})
