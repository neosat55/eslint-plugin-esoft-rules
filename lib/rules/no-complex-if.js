'use strict';

const {traverseLogicalHelperLeft} = require('../../utils');
/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    schema: [
      {
        type: 'object',
        properties: {
          depth: {
            type: 'number',
            default: 4,
            minimum: 1
          }
        }
      }
    ],
    messages: {
      avoidComplexIf: `No complex if statement \`{{ text }}\``
    },
    type: 'suggestion',
    fixable: null,
    docs: {
      description: 'enforce split big conditional statement to variables',
      recommended: false
    }
  },

  create(context) {
    const sourceCode = context.getSourceCode();
    const options = context.options;
    const depth = options[0] && options[0].depth || 4;

    const traverseLogical = (root) => {
      return traverseLogicalHelperLeft(root);
    };

    return {
      /**
       * @param {import('eslint').Rule.Node} node
       * @constructor
       */
      IfStatement(node) {
        const res = traverseLogical(node.test);

        if (res.length >= depth) {
          context.report({
            node: res[depth - 1],
            data: {
              text: sourceCode.getText(res[depth - 1])
            },
            messageId: 'avoidComplexIf'
          });
        }
      }
    };
  }
};
