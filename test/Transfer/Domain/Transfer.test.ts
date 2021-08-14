import { Account } from '../../../src/Account/Domain/Account'
import { Transfer } from '../../../src/Transfer/Domain/Transfer'
import { InvalidTransferProperties } from '../../../src/Transfer/Domain/InvalidTransferProperties'

test('should throw error if transfer amount is invalid', () => {
  const sender = new Account(1, 10)
  const beneficiary = new Account(2, 10)
  expect(() => new Transfer(1, sender, beneficiary, 0)).toThrow(InvalidTransferProperties)
})

test('should throw error if sender and beneficiary are the same account', () => {
  const sender = new Account(1, 10)
  const beneficiary = new Account(1, 10)
  expect(() => new Transfer(1, sender, beneficiary, 0)).toThrow(InvalidTransferProperties)
})

test('should update accounts balances when a transfer is applied', () => {
  const sender = new Account(1, 10)
  const beneficiary = new Account(2, 10)
  const transfer = new Transfer(1, sender, beneficiary, 5)
  transfer.apply()
  expect(sender.balance).toEqual(5)
  expect(beneficiary.balance).toEqual(15)
})