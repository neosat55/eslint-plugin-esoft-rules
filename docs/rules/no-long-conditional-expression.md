[//]: # (This file is generated by eslint-docgen. Do not edit it directly.)

# no-long-conditional-expression

enforce format if statement

## Rule details

✔️ Examples of **correct** code:
```js
if (a && b) {}
if (a() && (b || c)) {}

if (
      a && b || c
    ) {}

if (
      (a || b) && c
    ) {}

if (
      (a) && b
    ) {}

if (
      a && (b)
    ) {}

if (variable1 && variable2 || variable3 > variable4) {}
```

❌ Examples of **incorrect** code with `[100]` options:
```js
if (newItem.length && (!newItem.find((item) => prevItem.includes(item)) ||
        !prevItem.find((item) => newItem.includes(item)))) {}

if (Array.isArray(val) && action === 'select-option' && val.length > 1 &&
      val.some((item) => item.value === this.optionSelectAll.value)) {}

if (!this.user[field] ||
        Array.isArray(this.user[field]) && !this.user[field].length ||
        !Object.keys(this.user[field]).length) {}
```

✔️ Examples of **correct** code with `[100]` options:
```js
if (
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
        ) {}

if (regionalTicket && 
          (regionalTicket.childTicket || regionalTicket.parentTicket)
        ){}

if (
        activityTypeCloneList.includes(selectedTypesList[key]) ||
        this.tab !== preparedFilterAcitivities.ALL_ACTIVITIES
      ) {}

if (
        this.UserStore.hasPermission(USERS_SERVICE, users.UPDATE_USERS_CATEGORIES) ||
        this.userId === this.UserStore.userId &&
        this.UserStore.hasPermission(USERS_SERVICE, users.UPDATE_USER_CATEGORIES)
      ) {}

if (
        this.values['activitiesFields.isGoogleCalendarAdd'] &&
        this.values['activitiesFields.isGoogleCalendarAdd'].length > 0 &&
        !this.existToken
      ) {}

if (
        currentStatuses.includes(ticketStatusEnum.CANCELLED) &&
        this.ticketType === ticketTypeEnum.RENT_OUT
      ) {}

if (
        favorite && 
        [
          ticketStatusEnum.SUCCESS,
          ticketStatusEnum.CANCELLED,
          ticketStatusEnum.CANCELLED_RENTOUT
        ].includes(this.ticketStatusId)
      ) {}

if (favorite && [
        ticketStatusEnum.SUCCESS,
        ticketStatusEnum.CANCELLED,
        ticketStatusEnum.CANCELLED_RENTOUT
      ].includes(this.ticketStatusId)) 
      {}
```

❌ Examples of **incorrect** code with `[10]` options:
```js
if (variable1 && variable2 || variable3 > variable4) {}
if (variable1 && variable2 || (variable3 > variable4)) {}
if ((variable1 && variable2()) || variable3 > variable4) {}

if ((variable10204300 && heyVarHelloDream) && variable3) {}
if ((Object.keys(hello).map(superLongFunctionAllVeryLong)) && b || c) {}

if (
        variable1 && variable3 || (
          variableC &&
          variableD
        )
      ) {}
```

❌ Examples of **incorrect** code with `[20]` options:
```js
if ((variable1 && variable2()) || variable3 > variable4 && variable10 || variableLognName120 || Object.values(keys)) {}

if (
        (
          variable1 && variable2()
        ) || 
        variable3 > variable4 && 
        variable10 || variableLognName120 || Object.values(keys)) {}

if (variable1 && (variable2 || variable3 && (variable5 || variable10))) {}
```

✔️ Examples of **correct** code with `[20]` options:
```js
if (
        variable1 && 
        variable2 || 
        variable3 > 
        variable4
      ) {}

if (
        (Object.keys(hello).map(e)) &&
        b ||
        c
      ) {}

if (
        (
          variable1 && 
          variable2()
         ) || 
        variable3 > variable4 && 
        variable10 || 
        variableLognName120 || 
        Object.values(keys)
      ) {}
```

✔️ Examples of **correct** code with `[40]` options:
```js
if (
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
      ) {}
```

## Resources

* [Rule source](/lib/rules/no-long-conditional-expression.js)
* [Test source](/tests/lib/rules/no-long-conditional-expression.js)