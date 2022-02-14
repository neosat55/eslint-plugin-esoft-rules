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

/**
 * @param {import('eslint').Rule.Node} node
 */
const traverseLogicalHelperRight = (node) => {
  if (!isLogical(node)) {
    return [];
  }

  const rightNodes = traverseLogicalHelperRight(node.right);
  const leftNodes = traverseLogicalHelperRight(node.left);

  return [...leftNodes, ...rightNodes, node];
};

const traversePostOrderLogicalHelper = (node) => {
  const s1 = [];
  const s2 = [];

  s1.push(node);

  while (s1.length) {
    const node = s1.pop();

    s2.push(node);

    if (isLogical(node.right)) {
      s1.push(node.right);
    }

    if (isLogical(node.left)) {
      s1.push(node.left);
    }
  }

  return s2;
};

module.exports = {
  isLogical,
  traverseLogicalHelperLeft,
  traverseLogicalHelperRight,
  traversePostOrderLogicalHelper
};