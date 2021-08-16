export class InvalidTransferProperties extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidTransferProperties";
  }
}
