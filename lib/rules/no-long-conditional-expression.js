'use strict';

const {isLogical, makeIsNodeWrapped} = require('../../utils');
/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    schema: [
      {
        type: 'number',
        default: 80
      }
    ],
    messages: {
      avoidLong: `Large conditional expression. You should format it.`
    },
    type: 'suggestion',
    fixable: null,
    docs: {
      description: 'enforce format if statement',
      recommended: true
    }
  },

  create(context) {
    const sourceCode = context.getSourceCode();

    const normalizeOptions = (options) => {
      const _options = {};

      if (typeof options[0] === 'number' || !options[0]) {
        _options.len = options[0] || 80;
      }

      return _options;
    };

    const isExprOnOneLineWithLExpr = (left, right) => left.loc.end.line === right.loc.start.line;

    const checkExprIsOnOneLine = (struct) => {
      const {left, right, lExpr} = struct;

      if (left && right) {
        return left.loc.start.line === right.loc.end.line;
      }

      if (right && !left) {
        return isExprOnOneLineWithLExpr(lExpr.left, right);
      }

      if (left && !right) {
        return isExprOnOneLineWithLExpr(left, lExpr.right);
      }

      return null;
    };

    const checkIsNodeWrapped = makeIsNodeWrapped(sourceCode);

    const getLogicalExprNodesAsFlatArr = (node, initialRange) => {
      if (!isLogical(node)) {
        return [];
      }

      const obj = {
        lExprWrapped: false
      };

      if (!isLogical(node.left)) {
        obj.left = node.left;
      }

      if (!isLogical(node.right)) {
        obj.right = node.right;
      }

      obj.lExprWrapped = checkIsNodeWrapped(node, initialRange);
      obj.lExpr = node;

      const lRes = getLogicalExprNodesAsFlatArr(node.left, initialRange);
      const rRes = getLogicalExprNodesAsFlatArr(node.right, initialRange);

      return [...lRes, obj, ...rRes];
    };

    const options = normalizeOptions(context.options);
    const checkOperators = ['&&', '||'];

    return {
      /**
       * @param {import('eslint').Rule.Node} node
       * @constructor
       */
      IfStatement(node) {
        const testTextLen = sourceCode.getText(node.test).length;
        const initialRange = node.loc;

        if (testTextLen < options.len) {
          return;
        }

        const res = getLogicalExprNodesAsFlatArr(node.test, initialRange);

        const checked = res.map((struct) => {
          const {lExpr, lExprWrapped} = struct;
          const {operator} = lExpr;
          const skip = !struct.left && !struct.right;

          // Если выражение обёрнуто в скобки то пропускаем проверку
          if (!checkOperators.includes(operator) || skip || lExprWrapped) {
            return null;
          }

          return checkExprIsOnOneLine(struct);
        });

        checked.forEach((isOnOneLine, idx) => {
          if (isOnOneLine === true) {
            context.report({
              node: res[idx].lExpr,
              messageId: 'avoidLong'
            });
          }
        });
      }
    };
  }
};
