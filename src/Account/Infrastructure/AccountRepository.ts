import { Account } from '../Domain/Account';
import { IAccountRepository } from '../Domain/IAccountRepository'
import { InMemoryRepository } from '../../../lib/InMemoryRepository'

export class AccountRepository extends InMemoryRepository implements IAccountRepository {
  updateBalance(accountId: number, balance: number): Promise<Account> {
    throw new Error('Method not implemented.');
  }
  findAccountById(accountId: number): Promise<Account> {
    throw new Error('Method not implemented.');
  }
}