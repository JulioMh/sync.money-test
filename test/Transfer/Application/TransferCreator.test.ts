import { EntityNotFound } from "../../../lib/EntityNotFound";
import { Account } from "../../../src/Account/Domain/Account";
import { IAccountRepository } from "../../../src/Account/Domain/IAccountRepository";
import { TransferCreator } from "../../../src/Transfer/Application/TransferCreator";
import { ITransferRepository } from "../../../src/Transfer/Domain/ITransferRepository";
import { Transfer } from "../../../src/Transfer/Domain/Transfer";
import { TransferApplier } from "../../../src/Transfer/Domain/TransferApplier";

const sender = new Account(1, 10);
const beneficiary = new Account(2, 10);
const transferAmount = 5;

const AccountRepositoryMock = jest.fn<IAccountRepository, []>(() => ({
  findAccountById: jest.fn(async (id): Promise<Account> => {
    if (id === 1) return Promise.resolve(sender);
    else if (id === 2) return Promise.resolve(beneficiary);
    throw new EntityNotFound("Entity does not exist");
  }),
  updateAccount: jest.fn(),
}));

const TransferRepositoryMock = jest.fn<
  ITransferRepository,
  [IAccountRepository]
>(() => ({
  saveTransfer: jest.fn(),
  getTransferHistory: jest.fn(),
}));

TransferApplier.applyTransfer = jest.fn(
  TransferApplier.applyTransfer
);

const accountRepositoryMock = new AccountRepositoryMock();
const transferRepositoryMock = new TransferRepositoryMock(
  accountRepositoryMock
);

const transferCreator = new TransferCreator(
  transferRepositoryMock,
  accountRepositoryMock
);

test("should orchestrate a transfer", async () => {
  const incomingTransfer : Omit<Transfer, "id"> = {
    senderId: sender.id,
    beneficiaryId: beneficiary.id,
    amount: transferAmount
  }
  await transferCreator.createTransfer(incomingTransfer);
  expect(accountRepositoryMock.findAccountById).toHaveBeenCalledWith(sender.id);
  expect(accountRepositoryMock.findAccountById).toHaveBeenCalledWith(
    beneficiary.id
  );
  expect(TransferApplier.applyTransfer).toHaveBeenCalledWith(
    sender,
    beneficiary,
    transferAmount
  );
  expect(transferRepositoryMock.saveTransfer).toHaveBeenCalledWith({
    senderId: sender.id,
    beneficiaryId: beneficiary.id,
    amount: transferAmount,
  });
  expect(accountRepositoryMock.updateAccount).toHaveBeenCalledWith(
    new Account(sender.id, 5)
  );
  expect(accountRepositoryMock.updateAccount).toHaveBeenCalledWith(
    new Account(beneficiary.id, 15)
  );
});

