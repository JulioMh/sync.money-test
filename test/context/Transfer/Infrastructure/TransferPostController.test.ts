import { Request, Response } from "express";
import { CREATED } from "http-status";

import { ITransferCreator } from "../../../../src/context/Transfer/Application/TransferCreator";
import { Transfer } from "../../../../src/context/Transfer/Domain/Transfer";
import { TransferPostController } from "../../../../src/context/Transfer/Infrastructure/TransferPostController";

const newTransfer = new Transfer(1, 1, 2, 10);

const TransferCreatorMock = jest.fn<ITransferCreator, []>(() => ({
  createTransfer: jest.fn(() => Promise.resolve(newTransfer)),
}));

test("should call to create transfer use case", async () => {
  const transferCreatorMock = new TransferCreatorMock();
  const transferPostController = new TransferPostController(
    transferCreatorMock
  );

  const requestMock = {
    body: {
      senderId: 1,
      beneficiaryId: 2,
      amount: 10,
    },
  } as unknown as Request;

  const responseMock = {
    send: jest.fn(),
    status: jest.fn(() => responseMock),
  } as unknown as Response;

  await transferPostController.run(requestMock, responseMock);
  expect(transferCreatorMock.createTransfer).toHaveBeenCalledWith(
    new Transfer(undefined, 1, 2, 10)
  );
  expect(responseMock.status).toHaveBeenCalledWith(CREATED);
  expect(responseMock.send).toHaveBeenCalledWith(newTransfer);
});
