import { $, run } from 'eslint-vitest-rule-tester'
import * as tsParser from '@typescript-eslint/parser'

import { rule } from './require-get-server-side-props'

run({
  name: 'require-get-server-side-props',
  rule,
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    } satisfies tsParser.ParserOptions,
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
          callExpressionNames: ['getServerSideData'],
        },
      },
    },
    {
      code: `export const getServerSideProps = getServerSideDataIdentifier`,
      options: {
        style: {
          declarator: 'variable',
          identifierNames: ['getServerSideDataIdentifier'],
        },
      },
    },
    {
      code: $`
        const Page: NextPage = () => {
          return (
            <div className='container'>
              Hello
            </div>
          )
        }
        export default Page
        export const getServerSideProps = getServerSideData()
      `,
      options: {
        style: {
          declarator: 'variable',
          callExpressionNames: ['getServerSideData'],
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
          callExpressionNames: ['getServerSideData'],
        },
      },
      errors: ['requiredGetServerSidePropsWithCallExpressionNames'],
    },
    {
      code: `export function getServerSideProps() {}`,
      options: {
        style: {
          declarator: 'variable',
          callExpressionNames: ['getServerSideData'],
        },
      },
      errors: ['requiredGetServerSidePropsWithCallExpressionNames'],
    },
    {
      code: `export const getServerSideProps = getServerSideDataCopy()(() => {})`,
      options: {
        style: {
          declarator: 'variable',
          callExpressionNames: ['getServerSideData'],
        },
      },
      errors: ['requiredGetServerSidePropsWithCallExpressionNames'],
    },
    {
      code: 'export default function Page  ()  {}',
      errors: ['requiredGetServerSideProps'],
    },
    {
      code: $`
        export default function Page  ()  {
          return null
        }
      `,
      errors: ['requiredGetServerSideProps'],
    },
    {
      code: $`
        const Page: NextPage = () => {
          return (
            <div className='container'>
              Hello
            </div>
          )
        }
        export default Page
        export function getServerSideProps() {}
      `,
      options: {
        style: {
          declarator: 'variable',
          callExpressionNames: ['getServerSideData'],
        },
      },
      errors: ['requiredGetServerSidePropsWithCallExpressionNames'],
    },
    {
      code: `export const getServerSideProps = foo`,
      options: {
        style: {
          declarator: 'variable',
          callExpressionNames: ['getServerSideData'],
          identifierNames: ['getServerSideDataIdentifier'],
        },
      },
      errors: ['requiredGetServerSidePropsWith'],
    },
  ],
})
