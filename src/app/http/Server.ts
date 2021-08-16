import express, { Request, Response } from "express";
import Router from "express-promise-router";
import * as http from "http";
import httpStatus from "http-status";

import { AccountNotFound } from "../../context/Account/Domain/Exceptions/AccountNotFound";
import { InvalidAccountProperties } from "../../context/Account/Domain/Exceptions/InvalidAccountProperties";
import { NotEnoughBalance } from "../../context/Account/Domain/Exceptions/NotEnoughBalance";
import { InvalidTransferProperties } from "../../context/Transfer/Domain/InvalidTransferProperties";
import { registerRoutes } from "./routes";

export class Server {
  private _express: express.Express;
  private _httpServer?: http.Server;
  private _port: string;

  constructor(port: string) {
    this._port = port;
    this._express = express();
    this._express.use(express.json());
    const router = Router();
    registerRoutes(router);
    this._express.use(router);
    this._express.use(this.handleErrors);
  }

  private handleErrors(error: Error, req: Request, res: Response, next: any) {
    const jsonResponse = { message: error.message };
    if (
      error instanceof InvalidTransferProperties ||
      error instanceof InvalidAccountProperties
    ) {
      res.status(httpStatus.BAD_REQUEST).send(jsonResponse);
    } else if (error instanceof AccountNotFound) {
      res.status(httpStatus.NOT_FOUND).send(jsonResponse);
    } else if (error instanceof NotEnoughBalance) {
      res.status(httpStatus.BAD_REQUEST).send(jsonResponse);
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(jsonResponse);
    }
  }

  public get httpServer(): http.Server | undefined {
    return this._httpServer;
  }

  async listen(): Promise<http.Server | undefined> {
    this._httpServer = this._express.listen(this._port);
    return this._httpServer;
  }

  async stop() {
    return this._httpServer?.close();
  }
}
