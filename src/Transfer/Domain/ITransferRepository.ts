import { Transfer } from "../../Transfer/Domain/Transfer";

export interface ITransferRepository {
  saveTransfer(senderId: number, beneficiaryId: number, amount: number) : Promise<number>
  getTransferHistory(accountId: number) : Promise<Transfer[]>
}