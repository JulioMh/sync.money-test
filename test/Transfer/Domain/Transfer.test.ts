import { InvalidTransferProperties } from "../../../src/Transfer/Domain/InvalidTransferProperties";
import { Transfer } from "../../../src/Transfer/Domain/Transfer";

const senderId = 1;
const beneficiaryId = 2;

test("should throw error if transfer amount is invalid", () => {
  expect(() => new Transfer(1, senderId, beneficiaryId, 0)).toThrow(
    InvalidTransferProperties
  );
});

test("should throw error if sender and beneficiary are the same account", () => {
  expect(() => new Transfer(1, senderId, senderId, 0)).toThrow(
    InvalidTransferProperties
  );
});

test("should return transfer properties", () => {
  const transfer = new Transfer(1, senderId, beneficiaryId, 5);

  expect(transfer.id).toEqual(1);
  expect(transfer.senderId).toEqual(senderId);
  expect(transfer.beneficiaryId).toEqual(beneficiaryId);
  expect(transfer.amount).toEqual(5);
});
