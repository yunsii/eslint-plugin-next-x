import { AST_NODE_TYPES } from '@typescript-eslint/utils'

import { createRule, getCalleeMeta } from '../helpers'

import type { TSESTree } from '@typescript-eslint/utils'

export interface Options {
  style?: 'variable' | 'function' | {
    declarator: 'variable'
    callExpressionNames?: string[]
    identifierNames?: string[]
  }
}

type MessageIds =
  | 'requiredGetServerSideProps'
  | 'requiredGetServerSidePropsWithCallExpressionNames'
  | 'requiredGetServerSidePropsWithIdentifierNames'
  | 'requiredGetServerSidePropsWith'

export const rule = createRule<[Options], MessageIds>({
  create(context, [options]) {
    return {
      Program(node) {
        const { body } = node

        const exportNamedGetServerSidePropsDeclarations = body.filter((statement) => {
          if (statement.type === AST_NODE_TYPES.ExportNamedDeclaration) {
            const declaration = statement.declaration
            if (!declaration) {
              return false
            }
            if (declaration.type === AST_NODE_TYPES.VariableDeclaration) {
              const [declarationItem] = declaration.declarations
              return declarationItem.id?.type === AST_NODE_TYPES.Identifier && declarationItem.id.name === 'getServerSideProps'
            }
            if (declaration.type === AST_NODE_TYPES.FunctionDeclaration) {
              return declaration.id?.type === AST_NODE_TYPES.Identifier && declaration.id.name === 'getServerSideProps'
            }
          }
          return false
        }) as (TSESTree.ExportNamedDeclarationWithoutSourceWithMultiple | TSESTree.ExportNamedDeclarationWithoutSourceWithSingle | TSESTree.ExportNamedDeclarationWithSource)[]

        const getServerSidePropsCount = exportNamedGetServerSidePropsDeclarations.length

        if (getServerSidePropsCount === 0) {
          return context.report({
            messageId: 'requiredGetServerSideProps',
            node: context.sourceCode.ast,
          })
        }

        if (getServerSidePropsCount !== 1) {
          console.warn(`Number of getServerSideProps: ${getServerSidePropsCount}`)
          return
        }

        if (!options.style) {
          return
        }

        if (options.style === 'function' || options.style === 'variable') {
          return
        }

        const { callExpressionNames = [], identifierNames = [] } = options.style

        if (callExpressionNames.length === 0 && identifierNames.length === 0) {
          return
        }

        const [targetExported] = exportNamedGetServerSidePropsDeclarations
        const declaration = targetExported.declaration!

        const reportMessageWith = () => {
          if (callExpressionNames.length !== 0 && identifierNames.length !== 0) {
            return context.report({
              messageId: 'requiredGetServerSidePropsWith',
              node: context.sourceCode.ast,
              data: {
                callExpressionNames: callExpressionNames.join('/'),
                identifierNames: identifierNames.join('/'),
              },
            })
          }
          if (callExpressionNames.length !== 0) {
            return context.report({
              messageId: 'requiredGetServerSidePropsWithCallExpressionNames',
              node: context.sourceCode.ast,
              data: {
                callExpressionNames: callExpressionNames.join('/'),
              },
            })
          }
          return context.report({
            messageId: 'requiredGetServerSidePropsWithIdentifierNames',
            node: context.sourceCode.ast,
            data: {
              identifierNames: identifierNames.join('/'),
            },
          })
        }

        if (declaration.type === AST_NODE_TYPES.VariableDeclaration) {
          const [declarationItem] = declaration.declarations
          const init = declarationItem.init

          if (!init) {
            return reportMessageWith()
          }

          if (init.type === AST_NODE_TYPES.CallExpression) {
            const callee = init.type === AST_NODE_TYPES.CallExpression ? init : null

            if (!callee) {
              return reportMessageWith()
            }

            const calleeMeta = getCalleeMeta(callee)
            if (callExpressionNames.includes(calleeMeta.name)) {
              return null
            }
          } else if (init.type === AST_NODE_TYPES.Identifier && identifierNames.includes(init.name)) {
            return null
          }
          return reportMessageWith()
        } else {
          return reportMessageWith()
        }
      },
    }
  },
  meta: {
    docs: {
      description: 'Required getServerSideProps',
    },
    messages: {
      requiredGetServerSideProps: 'Required getServerSideProps.',
      requiredGetServerSidePropsWithCallExpressionNames: 'Required getServerSideProps by variable declaration with function called [{{ callExpressionNames }}].',
      requiredGetServerSidePropsWithIdentifierNames: 'Required getServerSideProps by variable declaration with identifier named [{{ identifierNames }}].',
      requiredGetServerSidePropsWith: 'Required getServerSideProps by variable declaration with function called [{{ callExpressionNames }}] or identifier named [{{ identifierNames }}].',
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
                callExpressionNames: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
                identifierNames: {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
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
