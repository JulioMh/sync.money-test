import { ITransferRepository } from "../Domain/ITransferRepository"
import { IAccountRepository } from "../../Account/Domain/IAccountRepository"

export class TransferService {
  private _transferRepository: ITransferRepository
  private _accountRepository: IAccountRepository

  constructor(transferRepository: ITransferRepository, accountRepository: IAccountRepository) {
    this._transferRepository = transferRepository
    this._accountRepository = accountRepository
  }

  applyTransfer(senderId: number, beneficiaryId: number, amount: number){
    throw new Error('Method not implemented.');
  }
}