import { ITransferRepository } from './Transfer/Domain/ITransferRepository'
import { TransferRepository } from './Transfer/Infrastructure/TransferRepository'
import { IAccountRepository } from './Account/Domain/IAccountRepository'
import { AccountRepository } from './Account/Infrastructure/AccountRepository'
import { ITransferCreator, TransferCreator } from './Transfer/Application/TransferCreator'
import { IAccountList, AccountList } from './Account/Application/AccountList'
import { TransferPostController } from './Transfer/Infrastructure/TransferPostController'
import { AccountGetController } from './Account/Infrastructure/AccountGetController'
import { IController } from './http/IController'

// This class mimic a IoC Container
export class Container {
  private static container: Container

  readonly accountRepository : IAccountRepository
  readonly transferRepository : ITransferRepository

  readonly transferCreator : ITransferCreator
  readonly accountList : IAccountList

  readonly transferPostController : IController
  readonly accountGetController : IController
  
  private constructor() {
    this.transferRepository = new TransferRepository()
    this.accountRepository = new AccountRepository(this.transferRepository)
    this.transferCreator = new TransferCreator(this.transferRepository, this.accountRepository)
    this.accountList = new AccountList(this.accountRepository)
    this.transferPostController = new TransferPostController(this.transferCreator)
    this.accountGetController = new AccountGetController(this.accountList)
  }

  static getContainer() : Container {
    if(!Container.container) {
      Container.container = new Container()
    }
    return Container.container;
  }
}