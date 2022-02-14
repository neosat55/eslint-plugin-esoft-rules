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
const ruleTester = new RuleTester();

const genErrors = (num) => {
  return Array(num)
    .fill({messageId: 'avoidLong'});
};

ruleTester.run('no-long-conditional-expression', rule, {
  valid: [
    `if (a && b) {}`,
    `if (a() && (b || c)) {}`,
    `if (
      a && b || c
    ) {}`,
    `if (
      (a || b) && c
    ) {}`,
    `if (
      (a) && b
    ) {}`,
    `if (
      a && (b)
    ) {}`,
    `if (variable1 && variable2 || variable3 > variable4) {}`,
    {
      code: `if (
        variable1 && 
        variable2 || 
        variable3 > 
        variable4
      ) {}`,
      options: [20]
    },
    {
      code: `if (
        variable1 && 
        variable2 ||
        (
          variable3 >
          variable4 &&
          (
            variable4 || 
            variable10
          )
        )
      ) {}`,
      options: [40]
      // only: true
    },
    {
      code: `if (
        (Object.keys(hello).map(e)) &&
        b ||
        c
      ) {}`,
      options: [20]
    },
    {
      code: `if (
          memberUserId &&
          (
            (
              ticketMemberRelationType.BORROWER |
              ticketMemberRelationType.CO_BORROWER |
              ticketMemberRelationType.CONTACT_PERSON |
              ticketMemberRelationType.ATTORNEY_IN_FACT |
              ticketMemberRelationType.PROPRIETOR |
              ticketMemberRelationType.SHAREHOLDER |
              ticketMemberRelationType.GUARANTOR |
              ticketMemberRelationType.MINOR_OWNER
            ) & memberType
          ) === memberType
        ) {}`,
      options: [100]
      // only: true
    },
    {
      only: true,
      code: `
        const hellp = 1;
      
        if (
          regionalTicket &&
          (
            regionalTicket.childTicket ||
            regionalTicket.parentTicket
          )
        ){}`,
      options: [100],
      parserOptions: {
        ecmaVersion: 6
      },
      // only: true
    },
    {
      code: `if (
        activityTypeCloneList.includes(selectedTypesList[key]) ||
        this.tab !== preparedFilterAcitivities.ALL_ACTIVITIES
      ) {}`,
      options: [100]
    },
    {
      code: `if (
        this.UserStore.hasPermission(USERS_SERVICE, users.UPDATE_USERS_CATEGORIES) ||
        this.userId === this.UserStore.userId &&
        this.UserStore.hasPermission(USERS_SERVICE, users.UPDATE_USER_CATEGORIES)
      ) {}`,
      options: [100]
    },
    {
      code: `if (
        this.values['activitiesFields.isGoogleCalendarAdd'] &&
        this.values['activitiesFields.isGoogleCalendarAdd'].length > 0 &&
        !this.existToken
      ) {}`,
      options: [100]
    },
    {
      code: `if (
        currentStatuses.includes(ticketStatusEnum.CANCELLED) &&
        this.ticketType === ticketTypeEnum.RENT_OUT
      ) {}`,
      options: [100],
      // only: true
    },
    {
      code: `if (
        favorite && 
        [
          ticketStatusEnum.SUCCESS,
          ticketStatusEnum.CANCELLED,
          ticketStatusEnum.CANCELLED_RENTOUT
        ].includes(this.ticketStatusId)
      ) {}`,
      options: [100],
      // only: true
    },
    {
      code: `if (
        (
          variable1 && 
          variable2()
         ) || 
        variable3 > variable4 && 
        variable10 || 
        variableLognName120 || 
        Object.values(keys)
      ) {}`,
      options: [20],
      // only: true
    }
  ],
  invalid: [
    {
      code: `if (variable1 && variable2 || variable3 > variable4) {}`,
      errors: genErrors(2),
      // only: true,
      options: [10]
    },
    {
      code: `if (variable1 && variable2 || (variable3 > variable4)) {}`,
      errors: genErrors(2),
      options: [10]
    },
    {
      code: `if ((variable1 && variable2()) || variable3 > variable4) {}`,
      errors: genErrors(2),
      options: [10]
    },
    {
      code: `if ((variable1 && variable2()) || variable3 > variable4 && variable10 || variableLognName120 || Object.values(keys)) {}`,
      errors: genErrors(5),
      options: [20],
      // only: true
    },
    {
      code: `if ((variable10204300 && heyVarHelloDream) && variable3) {}`,
      errors: genErrors(2),
      options: [10]
    },
    {
      code: `if ((Object.keys(hello).map(superLongFunctionAllVeryLong)) && b || c) {}`,
      errors: genErrors(2),
      options: [10]
    },
    {
      code: `if (
        variable1 && variable3 || (
          variableC &&
          variableD
        )
      ) {}`,
      errors: genErrors(1),
      options: [10]
    },
    {
      code: `if (newItem.length && (!newItem.find((item) => prevItem.includes(item)) ||
        !prevItem.find((item) => newItem.includes(item)))) {}`,
      errors: genErrors(1),
      parserOptions: {
        ecmaVersion: 'latest'
      },
      options: [100]
    },
    {
      code: `if (Array.isArray(val) && action === 'select-option' && val.length > 1 &&
      val.some((item) => item.value === this.optionSelectAll.value)) {}`,
      errors: genErrors(1),
      parserOptions: {
        ecmaVersion: 'latest'
      },
      options: [100]
    },
    {
      code: `if (!this.user[field] ||
        Array.isArray(this.user[field]) && !this.user[field].length ||
        !Object.keys(this.user[field]).length) {}`,
      errors: genErrors(1),
      options: [100]
    },
    {
      code: `if (favorite && [
        ticketStatusEnum.SUCCESS,
        ticketStatusEnum.CANCELLED,
        ticketStatusEnum.CANCELLED_RENTOUT
      ].includes(this.ticketStatusId)) 
      {}`,
      errors: genErrors(1),
      options: [100]
    }
  ]
});
