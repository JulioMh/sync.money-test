import { Request, Response } from "express";
import { OK } from "http-status";

import { IAccountList } from "../../../../src/context/Account/Application/AccountList";
import { Account } from "../../../../src/context/Account/Domain/Account";
import { AccountGetController } from "../../../../src/context/Account/Infrastructure/AccountGetController";
import { Transfer } from "../../../../src/context/Transfer/Domain/Transfer";

const account = new Account(1, 1, [new Transfer(1, 1, 2, 5)]);

const AccountListMock = jest.fn<IAccountList, []>(() => ({
  findAccount: jest.fn(() => Promise.resolve(account)),
}));

test("should call to get account use case", async () => {
  const accountListMock = new AccountListMock();
  const accountGetController = new AccountGetController(accountListMock);

  const requestMock = {
    params: {
      id: account.id,
    },
  } as unknown as Request;

  const responseMock = {
    send: jest.fn(),
    status: jest.fn(() => responseMock),
  } as unknown as Response;

  await accountGetController.run(requestMock, responseMock);
  expect(accountListMock.findAccount).toHaveBeenCalledWith(account.id);
  expect(responseMock.status).toHaveBeenCalledWith(OK);
  expect(responseMock.send).toHaveBeenCalledWith(account);
});
