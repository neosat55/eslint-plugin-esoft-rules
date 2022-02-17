/**
 * @param {import('eslint').Rule.Node} node
 * @returns {boolean}
 */
const isLogical = (node) => {
  return node.type === 'LogicalExpression' || node.type === 'BinaryExpression';
};

/**
 * @param {import('eslint').Rule.Node} node
 */
const traverseLogicalHelperLeft = (node) => {
  if (!isLogical(node)) {
    return [];
  }

  const leftNodes = traverseLogicalHelperLeft(node.left);
  const rightNodes = traverseLogicalHelperLeft(node.right);

  return [node, ...leftNodes, ...rightNodes];
};

const makeIsNodeWrapped = (sourceCode) => (node, initialRange) => {
  const tBefore = sourceCode.getTokenBefore(node);
  const tAfter = sourceCode.getTokenAfter(node);
  const bStart = tBefore.loc.start.line;
  const aEnd = tAfter.loc.end.line;

  return (
      bStart !== initialRange.start.line &&
      aEnd !== initialRange.end.line
    ) &&
    tBefore.value === '(' &&
    tAfter.value === ')';
};

module.exports = {
  isLogical,
  makeIsNodeWrapped,
  traverseLogicalHelperLeft
};