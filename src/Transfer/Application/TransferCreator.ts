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

  async createTransfer(
    senderId: number,
    beneficiaryId: number,
    amount: number
  ): Promise<Transfer> {
    const sender = await this._accountRepository.findAccountById(senderId);
    const beneficiary = await this._accountRepository.findAccountById(
      beneficiaryId
    );
    const transfer: Omit<Transfer, "id"> = {
      senderId: sender.id,
      beneficiaryId: beneficiary.id,
      amount,
    };
    TransferApplier.applyTransfer(sender, beneficiary, amount);
    await this._accountRepository.updateAccount(sender);
    await this._accountRepository.updateAccount(beneficiary);
    return this._transferRepository.saveTransfer(transfer);
  }
}
