/**
 * @fileoverview No long conditional expression
 * @author Fizuli Makhmudov
 */
'use strict';

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    schema: [],
    messages: {
      avoidLong: `Long logical expression. Break it!`
    },
    type: 'layout',
    fixable: 'whitespace',
    docs: {
      description: 'No long conditional expression',
      recommended: false
    }
  },

  create(context) {
    return {
      /**
       * @param {import('eslint').Rule.Node} node
       * @constructor
       */
      IfStatement(node) {
        const source = context.getSourceCode();

        const start = source.getTokenBefore(node.test).range[1];
        const end = source.getTokenAfter(node.test).range[0];
        const range = [start, end];

        const text = source.getText(node.test);

        context.report({
          node,
          messageId: 'avoidLong',
          fix(fixer) {
            return fixer.replaceTextRange(
              range, `\n${text}\n`
            );
          }
        });
      }
      /**
       * @param {import('eslint').Rule.Node} node
       * @constructor
       */
      // ExpressionStatement(node, state) {
      //   console.log(state);
      // }
    };
  }
};
