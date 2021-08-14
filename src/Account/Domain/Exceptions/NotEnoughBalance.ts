export class NotEnoughBalance extends Error {
  constructor(message: string) {
    super(message)
    this.name = "NotEnoughBalance"
  }
}