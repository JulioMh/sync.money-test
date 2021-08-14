import { InMemoryRepository } from '../../../lib/InMemoryRepository';
import { IAccountRepository } from '../../Account/Domain/IAccountRepository';
import { ITransferRepository } from '../Domain/ITransferRepository'
import { Transfer } from '../Domain/Transfer';
export class TransferRepository extends InMemoryRepository implements ITransferRepository {
  private _accountRepository : IAccountRepository

  constructor(accountRepository: IAccountRepository) {
    super()
    this._accountRepository = accountRepository
  }

  getTransferHistory(accountId: number): Promise<Transfer[]> {
    throw new Error('Method not implemented.');
  }
  saveTransfer(senderId: number, beneficiaryId: number, amount: number): Promise<number> {
    throw new Error('Method not implemented.');
  }
}