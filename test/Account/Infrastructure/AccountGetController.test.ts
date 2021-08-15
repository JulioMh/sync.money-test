import { Request, Response } from "express";
import { FOUND } from "http-status";

import { IAccountList } from "../../../src/Account/Application/AccountList";
import { Account } from "../../../src/Account/Domain/Account";
import { AccountGetController } from "../../../src/Account/Infrastructure/AccountGetController";
import { Transfer } from "../../../src/Transfer/Domain/Transfer";

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
  expect(responseMock.status).toHaveBeenCalledWith(FOUND);
  expect(responseMock.send).toHaveBeenCalledWith(account);
});
