import { InMemoryRepository } from "../../../../lib/InMemoryRepository";
import { Transfer } from "../../Transfer/Domain/Transfer";

/*
  This interface needs to extends from InMemoryRepository in order to provide 
  a mechanism to add some initial data into the DB
*/
export interface ITransferRepository extends InMemoryRepository {
  saveTransfer(transfer: Transfer): Promise<Transfer>;
  getTransferHistory(accountId: number): Promise<Transfer[]>;
}
