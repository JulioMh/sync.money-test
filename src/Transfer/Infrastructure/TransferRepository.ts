import { InMemoryRepository } from "../../../lib/InMemoryRepository";
import { IAccountRepository } from "../../Account/Domain/IAccountRepository";
import { ITransferRepository } from "../Domain/ITransferRepository";
import { Transfer } from "../Domain/Transfer";

export class TransferRepository
  extends InMemoryRepository
  implements ITransferRepository
{
  private _accountRepository: IAccountRepository;

  constructor(accountRepository: IAccountRepository) {
    super();
    this._accountRepository = accountRepository;
  }

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

  async saveTransfer(transfer: Omit<Transfer, "id">): Promise<Transfer> {
    const { senderId, beneficiaryId, amount } = transfer;
    await this._accountRepository.findAccountById(senderId);
    await this._accountRepository.findAccountById(beneficiaryId);
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
