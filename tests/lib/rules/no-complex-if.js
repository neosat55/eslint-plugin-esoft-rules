/**
 * @fileoverview No complex if
 * @author Fizuli Makhmudov
 */
'use strict';

const rule = require('../../../lib/rules/no-complex-if');
const RuleTester = require('eslint').RuleTester;

/**
 * @type {import('eslint').RuleTester}
 */
const ruleTester = new RuleTester();

ruleTester.run('no-complex-if', rule, {
  valid: [
    'if (a && b) {}',
    'if (a && b || c) {}',
    'if (a && (b || c)) {}',
    'if (a && (b || c && d)) {}',
  ],
  invalid: [
    {
      code: 'if (a && (b && c && (d || c))) {}',
      options: [{depth: 4}],
      errors: [{messageId: 'avoidComplexIf'}],
    },
    {
      code: 'if ((a && c || (d && n)) && b || c) {}',
      options: [{depth: 4}],
      errors: [{messageId: 'avoidComplexIf'}],
    },
    {
      code: 'if (a || c && b || d && c || d) {}',
      options: [{depth: 4}],
      errors: [{messageId: 'avoidComplexIf'}]
    }
  ]
});
