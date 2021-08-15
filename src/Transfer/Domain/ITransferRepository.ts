import { InMemoryRepository } from "../../../lib/InMemoryRepository";
import { Transfer } from "../../Transfer/Domain/Transfer";

export interface ITransferRepository extends InMemoryRepository {
  saveTransfer(transfer: Transfer): Promise<Transfer>;
  getTransferHistory(accountId: number): Promise<Transfer[]>;
}
