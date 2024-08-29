import { ESLintUtils } from '@typescript-eslint/utils'
import ts from 'typescript'

import { createRule } from '../helpers'

// ref: https://github.com/typescript-eslint/examples/blob/main/packages/eslint-plugin-example-typed-linting/src/rules/no-loop-over-enum.ts
export const rule = createRule({
  create(context) {
    const services = ESLintUtils.getParserServices(context)

    return {
      ForInStatement(node) {
        const type = services.getTypeAtLocation(node.right)

        if (type.symbol.flags & ts.SymbolFlags.Enum) {
          context.report({
            messageId: 'loopOverEnum',
            node: node.right,
          })
        }
      },
    }
  },
  meta: {
    docs: {
      description: 'Avoid looping over enums.',
      recommended: true,
      requiresTypeChecking: true,
    },
    messages: {
      loopOverEnum: 'Do not loop over enums.',
    },
    type: 'suggestion',
    schema: [],
  },
  name: 'no-loop-over-enum',
  defaultOptions: [],
})
