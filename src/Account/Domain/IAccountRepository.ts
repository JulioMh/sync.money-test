import { Account } from "./Account";
import { Transfer } from "../../Transfer/Domain/Transfer";

export interface IAccountRepository {
  findById(accountId: number) : Account
  updateBalance(account: Account) : Account
  findTransferHistory(accountId: number) : Transfer[]
}