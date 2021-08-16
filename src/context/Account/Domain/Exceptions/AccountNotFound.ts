export class AccountNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AccountNotFound";
  }
}
