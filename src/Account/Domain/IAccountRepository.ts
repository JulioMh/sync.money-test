import { Account } from "./Account";

export interface IAccountRepository {
  findAccountById(accountId: number): Promise<Account>;
  updateAccount(account: Account): Promise<Account>;
}
