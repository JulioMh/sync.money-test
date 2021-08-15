import { Request, Response } from 'express'
import { ITransferCreator } from '../../../../src/Transfer/Application/TransferCreator'
import { CREATED } from "http-status"
import { Transfer } from '../../../../src/Transfer/Domain/Transfer'
import { TransferPostController } from '../../../../src/Transfer/Infrastructure/Controller/TransferPostController'

const newTransfer = new Transfer(1, 1, 2, 10)

const TransferCreatorMock = jest.fn<ITransferCreator,[]>(() => ({ createTransfer: jest.fn(() => Promise.resolve(newTransfer)) }))
const RequestMock = jest.fn<Request,[]>()
const ResponseMock = jest.fn<Response,[]>()

test("should call to create transfer use case", async () => {
  const transferCreatorMock = new TransferCreatorMock()
  const transferPostController = new TransferPostController(transferCreatorMock)
  const requestMock = new RequestMock()

  const responseMock = new ResponseMock()
  responseMock.send = jest.fn()
  responseMock.status = jest.fn(() => responseMock)
  
  requestMock.body = {
    senderId: 1,
    beneficiaryId: 2,
    amount: 10
  }

  await transferPostController.run(requestMock, responseMock)
  expect(transferCreatorMock.createTransfer).toHaveBeenCalledWith(new Transfer(undefined, 1, 2, 10))
  expect(responseMock.status).toHaveBeenCalledWith(CREATED)
  expect(responseMock.send).toHaveBeenCalledWith(newTransfer)
})