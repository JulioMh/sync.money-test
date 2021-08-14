import { AccountRepository } from '../../../src/Account/Infrastructure/AccountRepository'
import { AccountNotFound } from '../../../src/Account/Domain/Exceptions/AccountNotFound'
import { Account } from '../../../src/Account/Domain/Account'

test('should return the account', async () => {
  const accountRepository = new AccountRepository()
  const expectedAccount = new Account(1, 12)
  const newAccountId = await accountRepository.save({ balance: 12 })

  const foundAccount = await accountRepository.findAccountById(newAccountId)
  expect(foundAccount).toEqual(expectedAccount)
})

test('should update balance account', async () => {
  const accountRepository = new AccountRepository()
  const expectedAccount = new Account(1, 10)
  const accountId = await accountRepository.save({ balance: 12 })
  const account = await accountRepository.updateBalance(accountId, 10)

  const foundAccount = await accountRepository.findAccountById(account.id)
  expect(foundAccount).toEqual(expectedAccount)
})

test('should return undefined if does not find the account', async () => {
  const accountRepository = new AccountRepository()
  const foundAccount = await accountRepository.findAccountById(1)
  expect(foundAccount).toBeUndefined()
})

test('should throw error if does not find the account to update', () => {
  const accountRepository = new AccountRepository()
  expect(() => accountRepository.updateBalance(1, 1)).toThrow(AccountNotFound)
})

