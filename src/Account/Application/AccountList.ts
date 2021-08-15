import { Account } from "../Domain/Account";
import { IAccountRepository } from "../Domain/IAccountRepository";

export interface IAccountList {
  findAccount(accountId: number): Promise<Account>;
}

export class AccountList implements IAccountList {
  private _accountRepository: IAccountRepository;

  constructor(accountRepository: IAccountRepository) {
    this._accountRepository = accountRepository;
  }

  findAccount(accountId: number): Promise<Account> {
    return this._accountRepository.findAccountWithTransactionsById(accountId);
  }
}
