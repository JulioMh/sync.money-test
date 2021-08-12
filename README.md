# Which data model to use
### Embedded Data Model:
```
[
  {
    "account_id": 1,
    "balance": 180,
    "transactions": [
      {
        ## This would represent a client's deposit ##
        "sender": "external",
        "beneficiary": 1,
        "amount": 200
      },
      {
        "sender": "1"
        "beneficiary": 2,
        "amount": 20
      }
    ]
  },
  {
    "account_id": 2,
    "balance": 20,
    "transactions": [
      {
        "beneficiary": 1,
        "sender": 2,
        "amount": 20
      }
    ]
  },
  ...
]
```
- **Flow**
  - Reach the endpoint
  - Look for account 1 and account 2 
  - Check sender has enough balance
  - Update and save both accounts
- **Disadvantages**
  - 2 critical operations. It would need a rollback mechanism.
  - 4 operations over database, two search and two updates.
  - Data duplication. Transaction will live inside of two different documents.
- **Advantages**
  - More efficient looking for data
---
### Normalized Data Model:
***Accounts***
```
[
  {
    "account_id": 1,
    "balance": 200,
  },
  {
    "account_id": 2,
    "balance": 300,
  },
  ...
]
```
***Transactions***
```
[
 {
    "sender": 1,
    "beneficiary": 2,
    "amount": 20
  } ,
  {
    "sender": 2,
    "beneficiary": 1,
    "amount": 30
  },
  ...
]
```
- **Flow**
  - Reach the endpoint
  - Look for account 1 and account 2
  - Check sender has enough balance
  - Update and save both accounts
- **Disadvantages**
  - 3 critical operations. Update two accounts and save transaction
  - 5 operations over the database, 2 search and 3 updates
  - Less efficient to search, we would need a *join*
- **Advantages**
  - No data duplication
---
### TX History Model:
***Transactions***
```
[
  {
    ## This would represent a client's deposit ##
    "sender": external,
    "beneficiary": 1,
    "amount": 200
  },
  {
    "sender": 1,
    "beneficiary": 2,
    "amount": 20
  }
]
```
***State*** (won't persist)
```
[
  {
    "account_id": 1,
    "balance": 180,
    "transactions": [
      {
        ## This would represent a client's deposit ##
        "sender": external,
        "beneficiary": 1,
        "amount": 200
      },
      {
        "sender": 1,
        "beneficiary": 2,
        "amount": 20
      }
    ]
  },
  {
    "account_id": 2,
    "balance": 20,
    "transactions": [
      {
        "sender": 1,
        "beneficiary": 2,
        "amount": 20
      }
    ]
  }
]
```
- **Flow**
  - Reach the endpoint
  - Create state based on TX history
  - Check sender has enough balance
  - Save TX
- **Disadvantages**
  - We would need to read all the TX history, potentially TBs of data
- **Advantages**
  - Just one critical operation, no need for rollback
  - No data duplication
---
---
### Conclusion
To keep the system as simple and efficient as possible, without duplicating data, I will implement the second approach. Modern databases already try to solve the problems of efficiency or atomicity that this approach entails.
