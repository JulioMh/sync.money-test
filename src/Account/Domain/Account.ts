export class Account {
  private _balance: number
  private _id: number
  
  constructor(id: number, balance: number) {
    this._id = id
    this._balance = balance | 0
  }

  get balance(): number {
    return this._balance
  }

  get id(): number {
    return this._id
  }

  hasEnoughBalance(expenseAmount: number) : boolean {
    throw new Error('Method not implemented.');
  }

  applyIncome(incomeAmount: number) : void {
    throw new Error('Method not implemented.');
  }

  applyExpense(expenseAmount: number) : void {
    throw new Error('Method not implemented.');
  }
}