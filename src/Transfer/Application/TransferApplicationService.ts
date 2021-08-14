import { ITransferRepository } from "../Domain/ITransferRepository"
import { IAccountRepository } from "../../Account/Domain/IAccountRepository"
import { Transfer } from "../Domain/Transfer"
import { TransferDomainService } from "../Domain/TransferDomainService"

export class TransferApplicationService {
  private _transferRepository: ITransferRepository
  private _accountRepository: IAccountRepository

  constructor(
    transferRepository: ITransferRepository,
    accountRepository: IAccountRepository
  ) {
    this._transferRepository = transferRepository
    this._accountRepository = accountRepository
  }

  async applyTransfer(senderId: number, beneficiaryId: number, amount: number): Promise<Transfer>{
    // TODO: Should be working with entities
    const sender = await this._accountRepository.findAccountById(senderId)    
    const beneficiary = await this._accountRepository.findAccountById(beneficiaryId)
    TransferDomainService.applyTransfer(sender, beneficiary, amount)
    await this._accountRepository.updateBalance(sender.id, sender.balance)
    await this._accountRepository.updateBalance(beneficiary.id, beneficiary.balance)
    return this._transferRepository.saveTransfer(sender.id, beneficiary.id, amount)
  }

  getTransferHistory(accountId: number) : Promise<Transfer[]> {
    return this._transferRepository.getTransferHistory(accountId)
  }
}