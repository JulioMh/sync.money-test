import { EntityNotFound } from "../../../../lib/EntityNotFound";
import { Account } from "../../../../src/context/Account/Domain/Account";
import { AccountRepository } from "../../../../src/context/Account/Infrastructure/AccountRepository";
import { TransferCreator } from "../../../../src/context/Transfer/Application/TransferCreator";
import { TransferRepository } from "../../../../src/context/Transfer/Infrastructure/TransferRepository";
import { Transfer } from "../../../../src/context/Transfer/Domain/Transfer";
import { TransferApplier } from "../../../../src/context/Transfer/Domain/TransferApplier";

const sender = new Account(1, 10);
const beneficiary = new Account(2, 10);
const transferAmount = 5;

TransferApplier.applyTransfer = jest.fn(TransferApplier.applyTransfer);

const accountRepositoryMock = {
  findAccountById: jest.fn(async (id): Promise<Account> => {
    if (id === 1) return Promise.resolve(sender);
    else if (id === 2) return Promise.resolve(beneficiary);
    throw new EntityNotFound("Entity does not exist");
  }),
  updateAccount: jest.fn()
} as unknown as AccountRepository;

const transferRepositoryMock = {
  saveTransfer: jest.fn()
} as unknown as TransferRepository;

const transferCreator = new TransferCreator(
  transferRepositoryMock,
  accountRepositoryMock
);

test("should orchestrate a transfer", async () => {
  const incomingTransfer: Transfer = new Transfer(
    undefined,
    sender.id,
    beneficiary.id,
    transferAmount
  );
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
  expect(transferRepositoryMock.saveTransfer).toHaveBeenCalledWith(
    incomingTransfer
  );
  expect(accountRepositoryMock.updateAccount).toHaveBeenCalledWith(
    new Account(sender.id, 5)
  );
  expect(accountRepositoryMock.updateAccount).toHaveBeenCalledWith(
    new Account(beneficiary.id, 15)
  );
});
