import { Transfer } from "../../Transfer/Domain/Transfer";
import { InvalidAccountProperties } from "./Exceptions/InvalidAccountProperties";
import { NotEnoughBalance } from "./Exceptions/NotEnoughBalance";

export class Account {
  private _balance: number;
  private _id: number;
  private _transfers?: Transfer[];

  constructor(id: number, balance: number, transfers?: Transfer[]) {
    if (balance < 0) {
      throw new InvalidAccountProperties(
        "Balance must be equals or higher than 0"
      );
    }
    this._id = id;
    this._balance = balance;
    this._transfers = transfers;
  }

  get balance(): number {
    return this._balance;
  }

  get id(): number {
    return this._id;
  }

  hasEnoughBalance(expenseAmount: number): boolean {
    return expenseAmount <= this._balance;
  }

  applyIncome(incomeAmount: number): void {
    this._balance += incomeAmount;
  }

  applyExpense(expenseAmount: number): void {
    if (!this.hasEnoughBalance(expenseAmount))
      throw new NotEnoughBalance("Account can not afford the expense");
    this._balance -= expenseAmount;
  }
}
