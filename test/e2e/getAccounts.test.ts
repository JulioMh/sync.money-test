import { Server } from '../../src/app/http/Server'
import { Container } from '../../src/app/Container'
import request from 'supertest'
import { NOT_FOUND, OK } from 'http-status'

let server: Server
beforeAll(async () => {
  const container: Container = Container.getContainer()
  container.accountRepository.save({ balance: 200 });
  container.accountRepository.save({ balance: 200 });
  container.transferRepository.save({ senderId: 1, beneficiaryId: 2, amount: 200 });
  container.transferRepository.save({ senderId: 2, beneficiaryId: 1, amount: 100 });

  server = new Server("8000")
  await server.listen()
})

afterAll(async () => {
  await server.stop()
})

describe("GET/accounts/:id", () => {
  describe("200", () => {
    test("should find existing account", async () => {
      const res = await request(server.httpServer).get("/accounts/1")
      expect(res.statusCode).toEqual(OK)
      expect(res.body).toEqual({ _id: 1, _balance: 200, _transfers: [{ _id: 1, _senderId: 1, _beneficiaryId: 2, _amount: 200 }, { _id: 2, _senderId: 2, _beneficiaryId: 1, _amount: 100 }]})
    })
  })
  
  describe("404", () => {
    test("should send 404 if the account does not exstist", async () => {
      const res = await request(server.httpServer).get("/accounts/3")
      expect(res.statusCode).toEqual(NOT_FOUND)
      expect(res.body).toEqual({ message: "Account ID: 3 was not found" })
    })
  })
})
