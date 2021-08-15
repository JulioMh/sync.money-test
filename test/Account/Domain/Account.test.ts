import { Account } from "../../../src/Account/Domain/Account";
import { InvalidAccountProperties } from "../../../src/Account/Domain/Exceptions/InvalidAccountProperties";
import { NotEnoughBalance } from "../../../src/Account/Domain/Exceptions/NotEnoughBalance";

test("should not have negative balance", () => {
  expect(() => new Account(1, -1)).toThrow(InvalidAccountProperties);
});

test("should have enough balance to assume an expense", () => {
  expect(() => {
    const account = new Account(1, 10);
    account.applyExpense(11);
  }).toThrow(NotEnoughBalance);
});

test("should update balance when an expense is applied", () => {
  const account = new Account(1, 10);
  account.applyExpense(5);
  expect(account.balance).toEqual(5);
});

test("should update balance when an income is applied", () => {
  const account = new Account(1, 10);
  account.applyIncome(5);
  expect(account.balance).toEqual(15);
});
