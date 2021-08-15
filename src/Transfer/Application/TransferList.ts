import { ITransferRepository } from "../Domain/ITransferRepository";
import { Transfer } from "../Domain/Transfer";

export interface ITransferList {
  getTransferHistory(accountId: number): Promise<Transfer[]>
}

export class TransferList implements ITransferList {
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
