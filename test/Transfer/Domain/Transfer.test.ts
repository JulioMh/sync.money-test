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

test("should throw error is sender ID is missing", () =>{
  expect(() => new Transfer(undefined, undefined, 1, 10)).toThrow(InvalidTransferProperties)
})

test("should throw error is beneficiary ID is missing", () =>{
  expect(() => new Transfer(undefined, 1, undefined, 10)).toThrow(InvalidTransferProperties)
})

test("should throw error if amount is missing", () =>{
  expect(() => new Transfer(undefined, 1, 2, undefined)).toThrow(InvalidTransferProperties)
})