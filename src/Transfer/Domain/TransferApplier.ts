import { Account } from "../../Account/Domain/Account";

export class TransferApplier {
  static applyTransfer(
    sender: Account,
    beneficiary: Account,
    amount: number
  ): void {
    sender.applyExpense(amount);
    beneficiary.applyIncome(amount);
  }
}
