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
    type: 'suggestion',
    docs: {
      description: 'disable assigment in ternary expression',
      recommended: true
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

        if (isConsequentAss) {
          context.report({
            node: node.consequent,
            messageId: 'avoidAssigment'
          });
        }

        if (isAlternateAss) {
          context.report({
            node: node.alternate,
            messageId: 'avoidAssigment'
          });
        }
      }
    };
  }
};
