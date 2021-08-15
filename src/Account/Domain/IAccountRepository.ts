import { InMemoryRepository } from "../../../lib/InMemoryRepository";
import { Account } from "./Account";

export interface IAccountRepository extends InMemoryRepository {
  findAccountById(accountId: number): Promise<Account>;
  findAccountWithTransactionsById(accountId: number): Promise<Account>;
  updateAccount(account: Account): Promise<Account>;
}
