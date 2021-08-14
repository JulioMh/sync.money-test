import { ITransferRepository } from '../../../src/Transfer/Domain/ITransferRepository'
import { Account } from '../../../src/Account/Domain/Account'
import { Transfer } from '../../../src/Transfer/Domain/Transfer'
import { TransferService } from '../../../src/Transfer/Application/TransferService'
import { IAccountRepository } from '../../../src/Account/Domain/IAccountRepository'

const sender = new Account(1, 10)
const beneficiary = new Account(2, 10)
const transferAmount = 5

const AccountRepositoryMock = jest.fn<IAccountRepository, []>(() => ({
  findAccountById: jest.fn(async (id) : Promise<Account> => {
    if(id === 1) return Promise.resolve(sender)
    else if (id === 2 ) return Promise.resolve(beneficiary)
  }),
  updateBalance: jest.fn()
}));

const TransferRepositoryMock = jest.fn<ITransferRepository, [IAccountRepository]>(() => ({
  saveTransfer: jest.fn(),
  getTransferHistory: jest.fn(async (id) : Promise<Transfer[]> => Promise.resolve([new Transfer(1, sender, beneficiary, transferAmount)]))
}));

const accountRepositoryMock = new AccountRepositoryMock()
const transferRepositoryMock = new TransferRepositoryMock(accountRepositoryMock)
const transferService = new TransferService(transferRepositoryMock, accountRepositoryMock)

test('should apply a transfer', async () => {
  await transferService.applyTransfer(sender.id, beneficiary.id, transferAmount)
  expect(accountRepositoryMock.findAccountById).toHaveBeenCalledWith(sender.id)
  expect(accountRepositoryMock.findAccountById).toHaveBeenCalledWith(beneficiary.id)
  expect(transferRepositoryMock.saveTransfer).toHaveBeenCalledWith(sender.id, beneficiary.id, transferAmount)
  expect(accountRepositoryMock.updateBalance).toHaveBeenCalledWith(sender.id, 5)
  expect(accountRepositoryMock.updateBalance).toHaveBeenCalledWith(beneficiary.id, 15)
})

test('should find transfer history', async () => {
  await transferService.getTransferHistory(sender.id)
  expect(transferRepositoryMock.getTransferHistory).toHaveBeenCalledWith(sender.id)
})