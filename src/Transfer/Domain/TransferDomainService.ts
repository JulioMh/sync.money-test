import { Account } from "../../Account/Domain/Account";

export class TransferDomainService {
  static applyTransfer(sender: Account, beneficiary: Account, amount: number) {
    sender.applyExpense(amount)
    beneficiary.applyIncome(amount)
  }
}