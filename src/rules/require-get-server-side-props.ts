import { AST_NODE_TYPES } from '@typescript-eslint/utils'

import { createRule, getCalleeMeta } from '../helpers'

export interface Options {
  style?: 'variable' | 'function' | {
    declarator: 'variable'
    callExpressionName?: string
  }
}

type MessageIds =
  | 'requiredGetServerSideProps'
  | 'requiredGetServerSidePropsWithCallExpressionName'

export const rule = createRule<[Options], MessageIds>({
  create(context, [options]) {
    return {
      Program(node) {
        const result = node.body.find((statement) => {
          if (statement.type !== AST_NODE_TYPES.ExportNamedDeclaration) {
            return null
          }
          const declaration = statement.declaration
          if (!declaration) {
            return null
          }

          const getTargetStatement = () => {
            if (declaration?.type === AST_NODE_TYPES.VariableDeclaration) {
              const [declarationItem] = declaration.declarations
              if (declarationItem.id.type === AST_NODE_TYPES.Identifier && declarationItem.id.name === 'getServerSideProps') {
                const init = declarationItem.init
                const callee = init?.type === AST_NODE_TYPES.CallExpression ? init : null
                return { type: 'variable', statement, callee } as const
              }
            }
            if (declaration.type === AST_NODE_TYPES.FunctionDeclaration && declaration.id?.type === AST_NODE_TYPES.Identifier
              && declaration.id.name === 'getServerSideProps') {
              return { type: 'function', statement } as const
            }
            return null
          }

          const target = getTargetStatement()

          if (!target) {
            return null
          }

          if (!options.style) {
            return target.statement
          }

          if (options.style === 'function') {
            return target.type === 'function' ? target.statement : null
          }
          if (typeof options.style !== 'string') {
            const callExpressionName = options.style.callExpressionName?.trim()
            if (!callExpressionName) {
              return target.type === 'variable' ? target.statement : null
            }
            const callee = target.callee
            if (!callee) {
              return null
            }
            const calleeMeta = getCalleeMeta(callee)
            if (calleeMeta.name === callExpressionName) {
              return target.statement
            }
            return null
          }
          return target.type === 'variable' ? target.statement : null
        })

        if (!result) {
          if (options.style && typeof options.style !== 'string' && options.style.callExpressionName?.trim()) {
            context.report({
              messageId: 'requiredGetServerSidePropsWithCallExpressionName',
              node: context.sourceCode.ast,
              data: {
                name: options.style.callExpressionName.trim(),
              },
            })
          } else {
            context.report({
              messageId: 'requiredGetServerSideProps',
              node: context.sourceCode.ast,
            })
          }
        }
      },
    }
  },
  meta: {
    docs: {
      description: 'Required getServerSideProps',
    },
    messages: {
      requiredGetServerSideProps: 'Required getServerSideProps',
      requiredGetServerSidePropsWithCallExpressionName: 'Required getServerSideProps by variable declaration with function called "{{ name }}"',
    },
    type: 'problem',
    // ref: https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/tests/schema-snapshots/ban-ts-comment.shot
    schema: [{
      properties: {
        style: {
          oneOf: [
            {
              type: 'string',
              enum: ['variable', 'function'],
            },
            {
              type: 'object',
              properties: {
                declarator: {
                  type: 'string',
                  enum: ['variable'],
                },
                callExpressionName: {
                  type: 'string',
                },
              },
            },
          ],
        },
      },
      type: 'object',
    }],
  },
  name: 'require-get-server-side-props',
  defaultOptions: [{}],
})
