/**
 * @fileoverview No ternary assigment
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
      avoidAssigment: `Avoid using assigment in ternary expression`
    },
    type: 'layout',
    docs: {
      description: 'No assigment in ternary expression',
      recommended: false
    }
  },

  create(context) {
    return {
      /**
       * @param {import('eslint').Rule.Node} node
       * @constructor
       */
      ConditionalExpression: (node) => {
        const isConsequentAss = node.consequent.type === 'AssignmentExpression';
        const isAlternateAss = node.alternate.type === 'AssignmentExpression';

        if (isConsequentAss || isAlternateAss) {
          context.report({
            node,
            messageId: 'avoidAssigment'
          });
        }
      }
    };
  }
};
