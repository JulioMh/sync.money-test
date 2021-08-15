import { ITransferRepository } from "../Domain/ITransferRepository";
import { Transfer } from "../Domain/Transfer";

export class TransferList {
  private _transferRepository: ITransferRepository;

  constructor(
    transferRepository: ITransferRepository
  ) {
    this._transferRepository = transferRepository;
  }

  getTransferHistory(accountId: number): Promise<Transfer[]> {
    return this._transferRepository.getTransferHistory(accountId);
  }
}
