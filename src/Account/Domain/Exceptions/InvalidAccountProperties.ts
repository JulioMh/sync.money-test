export class InvalidAccountProperties extends Error {
  constructor(message: string) {
    super(message)
    this.name = "InvalidAccountProperties"
  }
}