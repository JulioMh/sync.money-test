import { Account } from "../../Account/Domain/Account";

export class Transfer {
  private _sender: Account
  private _beneficiary: Account
  private _amount: number

  constructor(sender: Account, beneficiary: Account, amount: number) {
    this._amount = amount
    this._beneficiary = beneficiary
    this._sender = sender
  }

  get sender() : Account {
    return this._sender
  }
  
  get beneficiary() : Account {
    return this._beneficiary
  }

  get amount() : number {
    return this._amount
  }
  apply() : void {
    throw new Error('Method not implemented.');
  }
}