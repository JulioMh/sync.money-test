import { Transfer } from "../../Transfer/Domain/Transfer";

export interface ITransferRepository {
  saveTransfer(senderId: number, beneficiaryId: number, amount: number) : Promise<Transfer>
  getTransferHistory(accountId: number) : Promise<Transfer[]>
}