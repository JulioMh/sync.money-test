import {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
} from "http-status";
import request from "supertest";

import { Container } from "../../src/app/Container";
import { Server } from "../../src/app/http/Server";

let server: Server;
beforeAll(async () => {
  const container: Container = Container.getContainer();
  container.accountRepository.save({ balance: 300 });
  container.accountRepository.save({ balance: 250 });

  server = new Server("8000");
  await server.listen();
});

afterAll(async () => {
  await server.stop();
});

describe("POST/transfers", () => {
  describe("201", () => {
    test("should create a transfer", async () => {
      const transfer = {
        senderId: 1,
        beneficiaryId: 2,
        amount: 20,
      };
      const res = await request(server.httpServer)
        .post("/transfers")
        .send(transfer);

      expect(res.statusCode).toEqual(CREATED);
      expect(res.body).toEqual({
        _senderId: 1,
        _id: 1,
        _beneficiaryId: 2,
        _amount: 20,
      });
    });
  });
  describe("404", () => {
    test("should return 404 if a senderId does not exist", async () => {
      const transfer = {
        senderId: 3,
        beneficiaryId: 1,
        amount: 20,
      };
      const res = await request(server.httpServer)
        .post("/transfers")
        .send(transfer);

      expect(res.statusCode).toEqual(NOT_FOUND);
      expect(res.body).toEqual({ message: "Account ID: 3 was not found" });
    });

    test("should return 404 if a beneficiaryId does not exist", async () => {
      const transfer = {
        senderId: 1,
        beneficiaryId: 3,
        amount: 20,
      };
      const res = await request(server.httpServer)
        .post("/transfers")
        .send(transfer);

      expect(res.statusCode).toEqual(NOT_FOUND);
      expect(res.body).toEqual({ message: "Account ID: 3 was not found" });
    });
  });

  describe("400", () => {
    test("should return 400 if beneficiaryId is missing", async () => {
      const transfer = {
        senderId: 1,
        amount: 20,
      };
      const res = await request(server.httpServer)
        .post("/transfers")
        .send(transfer);

      expect(res.statusCode).toEqual(BAD_REQUEST);
      expect(res.body).toEqual({ message: "Beneficiary ID is missing" });
    });

    test("should return 400 if senderId is missing", async () => {
      const transfer = {
        beneficiaryId: 1,
        amount: 20,
      };
      const res = await request(server.httpServer)
        .post("/transfers")
        .send(transfer);

      expect(res.statusCode).toEqual(BAD_REQUEST);
      expect(res.body).toEqual({ message: "Sender ID is missing" });
    });

    test("should return 400 if amount is missing", async () => {
      const transfer = {
        senderId: 1,
        beneficiaryId: 2,
      };
      const res = await request(server.httpServer)
        .post("/transfers")
        .send(transfer);

      expect(res.statusCode).toEqual(BAD_REQUEST);
      expect(res.body).toEqual({
        message: "Transfer amount must be higher than 0",
      });
    });

    test("should return 400 if some field is invalid", async () => {
      const transfer = {
        senderId: 1,
        beneficiaryId: 2,
        amount: -1,
      };
      const res = await request(server.httpServer)
        .post("/transfers")
        .send(transfer);

      expect(res.statusCode).toEqual(BAD_REQUEST);
      expect(res.body).toEqual({
        message: "Transfer amount must be higher than 0",
      });
    });

    test("should return 400 if sender does not have enough balance", async () => {
      const transfer = {
        senderId: 1,
        beneficiaryId: 2,
        amount: 10000,
      };
      const res = await request(server.httpServer)
        .post("/transfers")
        .send(transfer);

      expect(res.statusCode).toEqual(BAD_REQUEST);
      expect(res.body).toEqual({
        message: "Account can not afford the expense",
      });
    });
  });
});
