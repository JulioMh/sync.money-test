import { Account } from "../../../../src/context/Account/Domain/Account";
import { TransferApplier } from "../../../../src/context/Transfer/Domain/TransferApplier";

const sender = new Account(1, 10);
const beneficiary = new Account(2, 10);
const transferAmount = 5;

test("should apply expenses and income", () => {
  sender.applyExpense = jest.fn();
  beneficiary.applyIncome = jest.fn();
  TransferApplier.applyTransfer(sender, beneficiary, transferAmount);
  expect(sender.applyExpense).toHaveBeenCalledWith(transferAmount);
  expect(beneficiary.applyIncome).toHaveBeenCalledWith(transferAmount);
});
