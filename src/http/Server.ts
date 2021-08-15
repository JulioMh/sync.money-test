import express, { Request, Response } from 'express';
import Router from 'express-promise-router'
import httpStatus from "http-status"
import { InvalidAccountProperties } from '../Account/Domain/Exceptions/InvalidAccountProperties';
import { InvalidTransferProperties } from '../Transfer/Domain/InvalidTransferProperties';
import { AccountNotFound } from '../Account/Domain/Exceptions/AccountNotFound';
import { NotEnoughBalance } from '../Account/Domain/Exceptions/NotEnoughBalance';

import { registerRoutes } from "./routes"

export class Server {
  private _express: express.Express;
  private _port: string;
  
  constructor(port: string) {
    this._port = port;
    this._express = express();
    this._express.use(express.json());
    const router = Router();
    registerRoutes(router)
    this._express.use(router)
    this._express.use(this.handleErrors);
  }
  
  private handleErrors(error: Error, req: Request, res: Response, next: Function) {
    console.log(error.message)
    const jsonResponse = { message: error.message }
    if(error instanceof InvalidTransferProperties || error instanceof InvalidAccountProperties){
      res.status(httpStatus.BAD_REQUEST).send(jsonResponse)
    } else if(error instanceof AccountNotFound) {
      res.status(httpStatus.NOT_FOUND).send(jsonResponse)
    } else if(error instanceof NotEnoughBalance) {
        res.status(httpStatus.NOT_ACCEPTABLE).send(error.message)
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(jsonResponse)
    }
  }

  async listen() {
    this._express.listen(this._port)
  }
}