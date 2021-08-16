import { Account } from "../../../../src/context/Account/Domain/Account";
import { Transfer } from "../../../../src/context/Transfer/Domain/Transfer";
import { TransferRepository } from "../../../../src/context/Transfer/Infrastructure/TransferRepository";

let transferRepository: TransferRepository;

const sender = new Account(1, 10);
const beneficiary = new Account(2, 10);
const transferAmount = 5;

const incomingTransfer = new Transfer(
  undefined,
  sender.id,
  beneficiary.id,
  transferAmount
);

beforeEach(() => {
  // This will wipe out data from previous test
  transferRepository = new TransferRepository();
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
  const newTransfer = await transferRepository.saveTransfer(incomingTransfer);

  expect(newTransfer).toEqual(expectedTransfer);
});

test("shold throw error if something goes wrong saving transfer data", async () => {
  transferRepository.save = jest.fn(() => {
    throw new Error("Something failed");
  });
  expect(
    transferRepository.saveTransfer(incomingTransfer)
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
