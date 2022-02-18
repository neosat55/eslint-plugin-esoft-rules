'use strict';

const rule = require('../../../lib/rules/no-ternary-assigment');
const RuleTester = require('eslint-docgen').RuleTester;

const ruleTester = new RuleTester();

ruleTester.run('no-ternary-assigment', rule, {
  valid: [
    'a === 1 ? b : c',
    'true ? c() : null',
    'var c = a ? 1 : 2'
  ],
  invalid: [
    {
      code: 'a === 1 ? b = 1 : null',
      errors: [{messageId: 'avoidAssigment'}]
    },
    {
      code: 'true ? c() : c = 0',
      errors: [{messageId: 'avoidAssigment'}]
    },
    {
      code: 'true ? c ? a = b : g : h',
      errors: [{messageId: 'avoidAssigment'}]
    },
    {
      code: 'addressData === false ? addressData = {} : logger = false;',
      errors: [{messageId: 'avoidAssigment'}, {messageId: 'avoidAssigment'}]
    }
  ]
});
