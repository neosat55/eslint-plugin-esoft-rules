/**
 * @fileoverview No long conditional expression
 * @author Fizuli Makhmudov
 */
'use strict';

const rule = require('../../../lib/rules/no-long-conditional-expression');
const RuleTester = require('eslint').RuleTester;

/**
 * @type {import('eslint').RuleTester}
 */
const ruleTester = new RuleTester({

});


ruleTester.run('no-long-conditional-expression', rule, {

  valid: [
    'a && b',
    'a || b',
    'a && b || c && d'
  ],
  invalid: [
    {
      code: `if (superVeryLongNameAAAAAAAAA && superVeryLongNameBBBBBBBBB || superVeryLongNameCCCCCCCCC) {}`,
      errors: [{messageId: 'avoidLong'}],
      output: `if (
superVeryLongNameAAAAAAAAA && superVeryLongNameBBBBBBBBB || superVeryLongNameCCCCCCCCC
) {}`
    },
    // {
    //   code: 'superVeryLongNameAAAAAAAAA && superVeryLongNameBBBBBBBBB || superVeryLongNameCCCCCCCCC && foo()',
    //   errors: [{messageId: 'avoidLong'}]
    // }
  ]
});
