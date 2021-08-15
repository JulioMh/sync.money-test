import { EntityNotFound } from "../../../lib/EntityNotFound";
import { Account } from "../../../src/Account/Domain/Account";
import { IAccountRepository } from "../../../src/Account/Domain/IAccountRepository";
import { TransferApplicationService } from "../../../src/Transfer/Application/TransferApplicationService";
import { ITransferRepository } from "../../../src/Transfer/Domain/ITransferRepository";
import { Transfer } from "../../../src/Transfer/Domain/Transfer";
import { TransferDomainService } from "../../../src/Transfer/Domain/TransferDomainService";

const sender = new Account(1, 10);
const beneficiary = new Account(2, 10);
const transferAmount = 5;

const AccountRepositoryMock = jest.fn<IAccountRepository, []>(() => ({
  findAccountById: jest.fn(async (id): Promise<Account> => {
    if (id === 1) return Promise.resolve(sender);
    else if (id === 2) return Promise.resolve(beneficiary);
    throw new EntityNotFound("Entity does not exist");
  }),
  updateBalance: jest.fn(),
}));

const TransferRepositoryMock = jest.fn<
  ITransferRepository,
  [IAccountRepository]
>(() => ({
  saveTransfer: jest.fn(),
  getTransferHistory: jest.fn(
    async (): Promise<Transfer[]> =>
      Promise.resolve([
        new Transfer(1, sender.id, beneficiary.id, transferAmount),
      ])
  ),
}));

TransferDomainService.applyTransfer = jest.fn(
  TransferDomainService.applyTransfer
);

const accountRepositoryMock = new AccountRepositoryMock();
const transferRepositoryMock = new TransferRepositoryMock(
  accountRepositoryMock
);

const transferApplicationService = new TransferApplicationService(
  transferRepositoryMock,
  accountRepositoryMock
);

test("should orchestrate a transfer", async () => {
  await transferApplicationService.applyTransfer(
    sender.id,
    beneficiary.id,
    transferAmount
  );
  expect(accountRepositoryMock.findAccountById).toHaveBeenCalledWith(sender.id);
  expect(accountRepositoryMock.findAccountById).toHaveBeenCalledWith(
    beneficiary.id
  );
  expect(TransferDomainService.applyTransfer).toHaveBeenCalledWith(
    sender,
    beneficiary,
    transferAmount
  );
  expect(transferRepositoryMock.saveTransfer).toHaveBeenCalledWith({
    senderId: sender.id,
    beneficiaryId: beneficiary.id,
    amount: transferAmount,
  });
  expect(accountRepositoryMock.updateBalance).toHaveBeenCalledWith(
    new Account(sender.id, 5)
  );
  expect(accountRepositoryMock.updateBalance).toHaveBeenCalledWith(
    new Account(beneficiary.id, 15)
  );
});

test("should orchestrate an history search", async () => {
  await transferApplicationService.getTransferHistory(sender.id);
  expect(transferRepositoryMock.getTransferHistory).toHaveBeenCalledWith(
    sender.id
  );
});
