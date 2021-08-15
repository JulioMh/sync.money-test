import { InvalidTransferProperties } from "./InvalidTransferProperties";

export class Transfer {
  private _id?: number;
  private _senderId: number;
  private _beneficiaryId: number;
  private _amount: number;

  constructor(
    id?: number,
    senderId?: number,
    beneficiaryId?: number,
    amount?: number
  ) {
    if (!senderId) throw new InvalidTransferProperties("Sender ID is missing");
    if (!beneficiaryId)
      throw new InvalidTransferProperties("Beneficiary ID is missing");
    if (senderId === beneficiaryId)
      throw new InvalidTransferProperties(
        "One account can not transfer money to itself"
      );
    if (!amount || amount <= 0)
      throw new InvalidTransferProperties(
        "Transfer amount must be higher than 0"
      );
    this._id = id;
    this._amount = amount;
    this._senderId = senderId;
    this._beneficiaryId = beneficiaryId;
  }

  get id(): number | undefined {
    return this._id;
  }

  get senderId(): number {
    return this._senderId;
  }

  get beneficiaryId(): number {
    return this._beneficiaryId;
  }

  get amount(): number {
    return this._amount;
  }
}
