import { IAccountRepository } from "../../../src/Account/Domain/IAccountRepository";
import { TransferList } from "../../../src/Transfer/Application/TransferList";
import { ITransferRepository } from "../../../src/Transfer/Domain/ITransferRepository";

const AccountRepositoryMock = jest.fn<IAccountRepository, []>(() => ({
  findAccountById: jest.fn(),
  updateAccount: jest.fn(),
}));

const TransferRepositoryMock = jest.fn<
  ITransferRepository,
  [IAccountRepository]
>(() => ({
  saveTransfer: jest.fn(),
  getTransferHistory: jest.fn(),
}));

const accountRepositoryMock = new AccountRepositoryMock();
const transferRepositoryMock = new TransferRepositoryMock(
  accountRepositoryMock
);

const transferList = new TransferList(
  transferRepositoryMock
);

test("should orchestrate an history search", async () => {
  const id = 1
  await transferList.getTransferHistory(id);
  expect(transferRepositoryMock.getTransferHistory).toHaveBeenCalledWith(id);
});

