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
    const sender = await this._accountRepository.findAccountById(senderId)    
    const beneficiary = await this._accountRepository.findAccountById(beneficiaryId)
    const transfer: Omit<Transfer, 'id'> = { senderId: sender.id, beneficiaryId: beneficiary.id, amount }
    TransferDomainService.applyTransfer(sender, beneficiary, amount)
    await this._accountRepository.updateBalance(sender)
    await this._accountRepository.updateBalance(beneficiary)
    return this._transferRepository.saveTransfer(transfer)
  }

  getTransferHistory(accountId: number) : Promise<Transfer[]> {
    return this._transferRepository.getTransferHistory(accountId)
  }
}