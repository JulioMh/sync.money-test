import { IAccountRepository } from "../../Account/Domain/IAccountRepository";
import { ITransferRepository } from "../Domain/ITransferRepository";
import { Transfer } from "../Domain/Transfer";
import { TransferApplier } from "../Domain/TransferApplier";

export class TransferCreator {
  private _transferRepository: ITransferRepository;
  private _accountRepository: IAccountRepository;

  constructor(
    transferRepository: ITransferRepository,
    accountRepository: IAccountRepository
  ) {
    this._transferRepository = transferRepository;
    this._accountRepository = accountRepository;
  }

  async createTransfer(transfer: Omit<Transfer, "id">): Promise<Transfer> {
    const { senderId, beneficiaryId, amount } = transfer
    const sender = await this._accountRepository.findAccountById(senderId);
    const beneficiary = await this._accountRepository.findAccountById(
      beneficiaryId
    );
    TransferApplier.applyTransfer(sender, beneficiary, amount);
    await this._accountRepository.updateAccount(sender);
    await this._accountRepository.updateAccount(beneficiary);
    return this._transferRepository.saveTransfer(transfer);
  }
}
