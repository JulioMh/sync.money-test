import { Account } from "./Account";

export interface IAccountRepository {
  findAccountById(accountId: number) : Promise<Account>
  updateBalance(accountId: number, balance: number) : Promise<Account>
}