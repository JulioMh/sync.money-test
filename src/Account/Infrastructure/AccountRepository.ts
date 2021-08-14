import { Transfer } from '../../Transfer/Domain/Transfer';
import { Account } from '../Domain/Account';
import { IAccountRepository } from '../Domain/IAccountRepository'
export class AccountRepository implements IAccountRepository {
  findById(accountId: number): Account {
    throw new Error('Method not implemented.');
  }
  updateBalance(account: Account): Account {
    throw new Error('Method not implemented.');
  }
  findTransferHistory(accountId: number): Transfer[] {
    throw new Error('Method not implemented.');
  }

}