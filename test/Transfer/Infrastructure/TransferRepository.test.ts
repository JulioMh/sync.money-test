import { Account } from "../../../src/Account/Domain/Account";
import { AccountNotFound } from "../../../src/Account/Domain/Exceptions/AccountNotFound";
import { IAccountRepository } from "../../../src/Account/Domain/IAccountRepository";
import { Transfer } from "../../../src/Transfer/Domain/Transfer";
import { TransferRepository } from "../../../src/Transfer/Infrastructure/TransferRepository";

let transferRepository: TransferRepository;

const sender = new Account(1, 10);
const beneficiary = new Account(2, 10);
const transferAmount = 5;

const AccountRepositoryMock = jest.fn<IAccountRepository, []>(() => ({
  findAccountById: async (id): Promise<Account> => {
    if (id === 1) return Promise.resolve(sender);
    if (id === 2) return Promise.resolve(beneficiary);
    throw new AccountNotFound("Entity does not exist");
  },
  updateAccount: jest.fn(),
}));

const accountRepositoryMock = new AccountRepositoryMock();

beforeEach(() => {
  // This will wipe out data from previous test
  transferRepository = new TransferRepository(accountRepositoryMock);
});

test("should return list of transfer", async () => {
  const expectedExpense = new Transfer(
    1,
    sender.id,
    beneficiary.id,
    transferAmount
  );
  const expectedIncome = new Transfer(
    2,
    beneficiary.id,
    sender.id,
    transferAmount
  );
  await transferRepository.save({
    senderId: sender.id,
    beneficiaryId: beneficiary.id,
    amount: transferAmount,
  });
  await transferRepository.save({
    senderId: beneficiary.id,
    beneficiaryId: sender.id,
    amount: transferAmount,
  });

  const transferHistory = await transferRepository.getTransferHistory(
    sender.id
  );
  expect(transferHistory.sort()).toEqual(
    [expectedExpense, expectedIncome].sort()
  );
});

test("should save a transfer", async () => {
  const expectedTransfer = new Transfer(
    1,
    sender.id,
    beneficiary.id,
    transferAmount
  );
  const newTransfer = await transferRepository.saveTransfer({
    senderId: sender.id,
    beneficiaryId: beneficiary.id,
    amount: transferAmount,
  });

  expect(newTransfer).toEqual(expectedTransfer);
});

test("should throw error if transfer participant does not exist", async () => {
  expect(
    async () =>
      await transferRepository.saveTransfer({
        senderId: 3,
        beneficiaryId: beneficiary.id,
        amount: transferAmount,
      })
  ).rejects.toThrow(AccountNotFound);
  expect(
    async () =>
      await transferRepository.saveTransfer({
        senderId: sender.id,
        beneficiaryId: 3,
        amount: transferAmount,
      })
  ).rejects.toThrow(AccountNotFound);
});

test("shold throw error if something goes wrong saving transfer data", async () => {
  transferRepository.save = jest.fn(() => {
    throw new Error("Something failed");
  });
  expect(
    transferRepository.saveTransfer({
      senderId: sender.id,
      beneficiaryId: beneficiary.id,
      amount: transferAmount,
    })
  ).rejects.toThrowError("Internal repository error");
});

test("shold throw error if something goes wrong finding history", async () => {
  transferRepository.findBy = jest.fn(() => {
    throw new Error("Something failed");
  });
  expect(transferRepository.getTransferHistory(1)).rejects.toThrowError(
    "Internal repository error"
  );
});
