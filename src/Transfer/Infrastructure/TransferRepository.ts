import { InMemoryRepository } from "../../../lib/InMemoryRepository";
import { ITransferRepository } from "../Domain/ITransferRepository";
import { Transfer } from "../Domain/Transfer";

export class TransferRepository
  extends InMemoryRepository
  implements ITransferRepository
{
  async getTransferHistory(accountId: number): Promise<Transfer[]> {
    try {
      const objectHistory = await this.findBy(
        { key: "senderId", value: accountId },
        { key: "beneficiaryId", value: accountId }
      );
      return objectHistory.map(
        (object) =>
          new Transfer(
            object.id,
            object.senderId,
            object.beneficiaryId,
            object.amount
          )
      );
    } catch (error) {
      throw new Error(`Internal repository error: ${error.message}`);
    }
  }

  async saveTransfer(transfer: Transfer): Promise<Transfer> {
    const { senderId, beneficiaryId, amount } = transfer;
    try {
      const transferId = await this.save({ senderId, beneficiaryId, amount });
      return Promise.resolve(
        new Transfer(transferId, senderId, beneficiaryId, amount)
      );
    } catch (error) {
      throw new Error(`Internal repository error: ${error.message}`);
    }
  }
}
