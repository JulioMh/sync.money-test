export interface ITransferRepository {
  saveTransfer(senderId: number, beneficiaryId: number, amount: number) : number
}