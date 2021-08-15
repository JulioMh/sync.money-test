import { Account } from "../../../src/Account/Domain/Account";
import { AccountNotFound } from "../../../src/Account/Domain/Exceptions/AccountNotFound";
import { AccountRepository } from "../../../src/Account/Infrastructure/AccountRepository";

let accountRepository: AccountRepository;

beforeEach(() => {
  // This will wipe out data from previous test
  accountRepository = new AccountRepository();
});

test("should return the account", async () => {
  const expectedAccount = new Account(1, 12);
  const newAccountId = await accountRepository.save({ balance: 12 });

  const foundAccount = await accountRepository.findAccountById(newAccountId);
  expect(foundAccount).toEqual(expectedAccount);
});

test("should update balance account", async () => {
  const expectedAccount = new Account(1, 10);
  const accountId = await accountRepository.save({ balance: 12 });
  const account = await accountRepository.updateAccount(
    new Account(accountId, 10)
  );

  const foundAccount = await accountRepository.findById(account.id);
  expect(new Account(foundAccount.id, foundAccount.balance)).toEqual(
    expectedAccount
  );
});

test("should throw error if does not find the account", async () => {
  expect(
    async () => await accountRepository.findAccountById(1)
  ).rejects.toThrow(AccountNotFound);
});

test("should throw error if does not find the account to update", async () => {
  expect(
    async () => await accountRepository.updateAccount(new Account(1, 1))
  ).rejects.toThrow(AccountNotFound);
});

test("shold throw error if something goes wrong updating account", async () => {
  accountRepository.update = jest.fn(() => {
    throw new Error("Something failed");
  });
  expect(
    accountRepository.updateAccount(new Account(1, 10))
  ).rejects.toThrowError("Internal repository error");
});

test("shold throw error if something goes wrong finding account", async () => {
  accountRepository.findById = jest.fn(() => {
    throw new Error("Something failed");
  });
  expect(accountRepository.findAccountById(1)).rejects.toThrowError(
    "Internal repository error"
  );
});
