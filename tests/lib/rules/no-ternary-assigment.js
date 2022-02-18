'use strict';

const rule = require('../../../lib/rules/no-ternary-assigment');
const RuleTester = require('eslint-docgen').RuleTester;

const ruleTester = new RuleTester();

ruleTester.run('no-ternary-assigment', rule, {
  valid: [
    'c = 0',
    'a === 1 ? b : c',
    'true ? c() : null',
    'if (a) { c = 3 }'
  ],
  invalid: [
    {
      code: 'a === 1 ? b = 1 : null',
      errors: [{messageId: 'avoidAssigment'}]
    },
    {
      code: 'true ? c() : c = 0',
      errors: [{messageId: 'avoidAssigment'}]
    }
  ]
});
