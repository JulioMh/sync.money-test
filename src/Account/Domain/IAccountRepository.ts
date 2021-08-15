import { Account } from "./Account";

export interface IAccountRepository {
  findAccountById(accountId: number) : Promise<Account>
  updateBalance(account: Account) : Promise<Account>
}