import { EntityNotFound } from "../../../lib/EntityNotFound";
import { InMemoryRepository } from "../../../lib/InMemoryRepository";
import { Account } from "../Domain/Account";
import { AccountNotFound } from "../Domain/Exceptions/AccountNotFound";
import { IAccountRepository } from "../Domain/IAccountRepository";

export class AccountRepository
  extends InMemoryRepository
  implements IAccountRepository
{
  async updateAccount(account: Account): Promise<Account> {
    const { id, balance } = account;
    try {
      const updatedObject = await this.update({ id, balance });
      return Promise.resolve(
        new Account(updatedObject.id, updatedObject.balance)
      );
    } catch (error) {
      if (error instanceof EntityNotFound)
        throw new AccountNotFound(`Account ID: ${id} was not found`);
      throw new Error(`Internal repository error: ${error.message}`);
    }
  }

  async findAccountById(accountId: number): Promise<Account> {
    try {
      const object = await this.findById(accountId);
      return Promise.resolve(new Account(object.id, object.balance));
    } catch (error) {
      if (error instanceof EntityNotFound)
        throw new AccountNotFound(`Account ID: ${accountId} was not found`);
      throw new Error(`Internal repository error: ${error.message}`);
    }
  }
}
