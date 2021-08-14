import { ITransferRepository } from '../Domain/ITransferRepository'
export class TransferRepository implements ITransferRepository {
  saveTransfer(senderId: number, beneficiaryId: number, amount: number): number {
    throw new Error('Method not implemented.');
  }
}