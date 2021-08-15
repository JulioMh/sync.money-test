import { Transfer } from "../../Transfer/Domain/Transfer";

export interface ITransferRepository {
  saveTransfer(transfer: Transfer): Promise<Transfer>;
  getTransferHistory(accountId: number): Promise<Transfer[]>;
}
