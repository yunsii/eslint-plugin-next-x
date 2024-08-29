import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils'

import type { TSESTree } from '@typescript-eslint/utils'

export interface ExampleTypedLintingRuleDocs {
  description: string
  recommended?: boolean
  requiresTypeChecking?: boolean
}

export const createRule = ESLintUtils.RuleCreator<ExampleTypedLintingRuleDocs>(
  (name) =>
    `https://github.com/yunsii/eslint-plugin-next-x/blob/main/docs/rules/${name}.md`,
)

export function getCalleeMeta(node: TSESTree.CallExpression, depth = 0) {
  if (node.callee.type === AST_NODE_TYPES.Identifier) {
    return {
      name: node.callee.name,
      depth,
    }
  }
  if (node.callee.type === AST_NODE_TYPES.CallExpression) {
    return getCalleeMeta(node.callee, depth + 1)
  }
  throw new Error(`Unexpected callee type: ${node.callee.type}`)
}
