import { Transfer } from "../../Transfer/Domain/Transfer";

export interface ITransferRepository {
  saveTransfer(transfer: Omit<Transfer, 'id'>) : Promise<Transfer>
  getTransferHistory(accountId: number) : Promise<Transfer[]>
}