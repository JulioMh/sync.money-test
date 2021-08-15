import { Request, Response } from "express";
import { ITransferCreator } from "../Application/TransferCreator";
import { CREATED } from "http-status"
import { Transfer } from "../Domain/Transfer";
import { IController } from "../../http/IController"

export class TransferPostController implements IController {
  private _transferCreator : ITransferCreator
  
  constructor(transferCreator: ITransferCreator) {
    this._transferCreator = transferCreator
  }

  async run(req: Request, res: Response) : Promise<void> {
    const id: number = req.body.id;
    const senderId: number = req.body.senderId;
    const beneficiaryId: number = req.body.beneficiaryId
    const amount: number = req.body.amount 
    const transfer : Transfer = new Transfer(
      id,
      senderId, 
      beneficiaryId,
      amount
    )
    const createdTransder = await this._transferCreator.createTransfer(transfer)
    res.status(CREATED).send(createdTransder)
  }
}
