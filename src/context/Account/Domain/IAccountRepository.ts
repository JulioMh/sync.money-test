import { InMemoryRepository } from "../../../../lib/InMemoryRepository";
import { Account } from "./Account";

/*
  This interface needs to extends from InMemoryRepository in order to provide 
  a mechanism to add some initial data into the DB
*/
export interface IAccountRepository extends InMemoryRepository {
  findAccountById(accountId: number): Promise<Account>;
  findAccountWithTransactionsById(accountId: number): Promise<Account>;
  updateAccount(account: Account): Promise<Account>;
}
