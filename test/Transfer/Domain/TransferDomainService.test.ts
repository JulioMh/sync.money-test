import { Account } from "../../../src/Account/Domain/Account";
import { TransferDomainService } from "../../../src/Transfer/Domain/TransferDomainService";

const sender = new Account(1, 10)
const beneficiary = new Account(2, 10)
const transferAmount = 5

test('should apply expenses and income', () => {
  sender.applyExpense = jest.fn()
  beneficiary.applyIncome = jest.fn()
  TransferDomainService.applyTransfer(sender, beneficiary, transferAmount)
  expect(sender.applyExpense).toHaveBeenCalledWith(transferAmount)
  expect(beneficiary.applyIncome).toHaveBeenCalledWith(transferAmount)
})