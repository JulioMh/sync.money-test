import { IAccountRepository } from "../../../src/Account/Domain/IAccountRepository";
import { TransferList } from "../../../src/Transfer/Application/TransferList";
import { ITransferRepository } from "../../../src/Transfer/Domain/ITransferRepository";

const TransferRepositoryMock = jest.fn<
  ITransferRepository,
  []
>(() => ({
  saveTransfer: jest.fn(),
  getTransferHistory: jest.fn(),
}));

const transferRepositoryMock = new TransferRepositoryMock();

const transferList = new TransferList(
  transferRepositoryMock
);

test("should orchestrate an history search", async () => {
  const id = 1
  await transferList.getTransferHistory(id);
  expect(transferRepositoryMock.getTransferHistory).toHaveBeenCalledWith(id);
});

