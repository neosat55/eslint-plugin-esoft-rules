/**
 * @fileoverview No long conditional expression
 * @author Fizuli Makhmudov
 */
'use strict';

const {isLogical} = require('../../utils');
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
    const sourceCode = context.getSourceCode();

    const normalizeOptions = (options) => {
      const _options = {};

      if (typeof options[0] === 'number') {
        _options.len = options[0];
      }

      return _options;
    };

    const ctx = (node, initialRange) => {
      if (!isLogical(node)) {
        return [];
      }

      const obj = {
        len: 0
      };

      if (!isLogical(node.left)) {
        obj.left = node.left;
        obj.len += sourceCode.getText(node.left).length;
      }

      if (!isLogical(node.right)) {
        obj.right = node.right;
        obj.len += sourceCode.getText(node.right).length;
      }

      console.log(sourceCode.getTokenBefore(node).range, sourceCode.getTokenAfter(node).range, initialRange);

      obj.operator = node;

      const lRes = ctx(node.left, initialRange);
      const rRes = ctx(node.right, initialRange);

      return [...lRes, obj, ...rRes];
    };

    const checkIsSameLine = (lLoc, operator) => {
      // console.log(lLoc, operator.loc);

      return lLoc.start.column !== operator.loc.start.column;
    };

    const getIsOnLine = (node, operator) => {
      const s = sourceCode.getTokenBefore(node);

      if (s && s.value === '(') {
        return checkIsSameLine(s.loc, operator);
      }

      return checkIsSameLine(node.loc, operator);
    };

    const checkIsElementIsOnSameLine = (le) => {
      const {left, right, operator} = le;
      let isOnLine = false;

      const lLoc = left && left.loc;
      const rLoc = right && right.loc;
      const op = operator.operator;

      if (op !== '&&' && op !== '||' && op !== '>' && op !== '<' && op !== '>=' && op !== '<=') {
        return false;
      }

      if (!rLoc && !lLoc) {
        return false;
      }

      if (lLoc && rLoc) {
        isOnLine = lLoc.start.line === rLoc.start.line;
      }

      if (lLoc && !rLoc) {
        isOnLine = getIsOnLine(left, operator);
      }

      if (rLoc && !lLoc) {
        isOnLine = getIsOnLine(right, operator);
      }

      return isOnLine;
    };

    const options = normalizeOptions(context.options);

    return {
      /**
       * @param {import('eslint').Rule.Node} node
       * @constructor
       */
      IfStatement(node) {
        const testTextLen = sourceCode.getText(node.test).length;
        const initialRange = node.range;

        if (testTextLen < options.len) {
          return;
        }

        const res = ctx(node.test, initialRange);
        const overlap = [];


        res.forEach((struct) => {
          const {operator} = struct;

          overlap.push(operator.range);
        });

        console.log(overlap);

        // console.log(res);

        // res.forEach((le) => {
        //   const leNode = le.operator;
        //   let leText = sourceCode.getText(leNode);
        //   // Пропускаем ноду если это пустой логический оператор
        //   let skip = !le.left && !le.right;
        //   const isOnSameLine = checkIsElementIsOnSameLine(le);
        //   const textLength = leText.length;
        //
        //   console.log(leNode.range);
        //
        //   // console.log(isOnSameLine, le.len, textLength);
        //
        //   // console.log(leText, leText.length, isOnSameLine);
        //   // console.log('------------------------------------');
        //
        //   if (!skip && isOnSameLine && textLength > options.len) {
        //     context.report({
        //       node: leNode.parent,
        //       messageId: 'avoidLong'
        //     });
        //   }
        // });
      }
    };
  }
};
