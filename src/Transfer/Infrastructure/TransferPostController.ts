import { Request, Response } from "express";
import { CREATED } from "http-status";

import { IController } from "../../http/IController";
import { ITransferCreator } from "../Application/TransferCreator";
import { Transfer } from "../Domain/Transfer";

export class TransferPostController implements IController {
  private _transferCreator: ITransferCreator;

  constructor(transferCreator: ITransferCreator) {
    this._transferCreator = transferCreator;
  }

  async run(req: Request, res: Response): Promise<void> {
    const id: number = req.body.id;
    const senderId: number = req.body.senderId;
    const beneficiaryId: number = req.body.beneficiaryId;
    const amount: number = req.body.amount;
    const transfer: Transfer = new Transfer(
      id,
      senderId,
      beneficiaryId,
      amount
    );
    const createdTransder = await this._transferCreator.createTransfer(
      transfer
    );
    res.status(CREATED).send(createdTransder);
  }
}
