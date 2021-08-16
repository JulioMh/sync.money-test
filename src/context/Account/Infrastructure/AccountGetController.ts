import { Request, Response } from "express";
import { OK } from "http-status";

import { IController } from "../../../app/http/IController";
import { IAccountList } from "../Application/AccountList";

export class AccountGetController implements IController {
  private _accountList: IAccountList;

  constructor(taccountList: IAccountList) {
    this._accountList = taccountList;
  }

  async run(req: Request, res: Response): Promise<void> {
    const accountId: number = parseInt(req.params.id);
    const createdTransder = await this._accountList.findAccount(accountId);
    res.status(OK).send(createdTransder);
  }
}
