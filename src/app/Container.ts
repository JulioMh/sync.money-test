import { AccountList, IAccountList } from "../context/Account/Application/AccountList";
import { IAccountRepository } from "../context/Account/Domain/IAccountRepository";
import { AccountGetController } from "../context/Account/Infrastructure/AccountGetController";
import { AccountRepository } from "../context/Account/Infrastructure/AccountRepository";
import { IController } from "./http/IController";
import {
  ITransferCreator,
  TransferCreator,
} from "../context/Transfer/Application/TransferCreator";
import { ITransferRepository } from "../context/Transfer/Domain/ITransferRepository";
import { TransferPostController } from "../context/Transfer/Infrastructure/TransferPostController";
import { TransferRepository } from "../context/Transfer/Infrastructure/TransferRepository";

// This class mimic a IoC Container
export class Container {
  private static container: Container;

  readonly accountRepository: IAccountRepository;
  readonly transferRepository: ITransferRepository;

  readonly transferCreator: ITransferCreator;
  readonly accountList: IAccountList;

  readonly transferPostController: IController;
  readonly accountGetController: IController;

  private constructor() {
    this.transferRepository = new TransferRepository();
    this.accountRepository = new AccountRepository(this.transferRepository);
    this.transferCreator = new TransferCreator(
      this.transferRepository,
      this.accountRepository
    );
    this.accountList = new AccountList(this.accountRepository);
    this.transferPostController = new TransferPostController(
      this.transferCreator
    );
    this.accountGetController = new AccountGetController(this.accountList);
  }

  static getContainer(): Container {
    if (!Container.container) {
      Container.container = new Container();
    }
    return Container.container;
  }
}
