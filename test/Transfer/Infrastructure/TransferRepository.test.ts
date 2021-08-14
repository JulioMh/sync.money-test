import { TransferRepository } from '../../../src/Transfer/Infrastructure/TransferRepository'
import { IAccountRepository } from '../../../src/Account/Domain/IAccountRepository'
import { Transfer } from '../../../src/Transfer/Domain/Transfer'
import { Account } from '../../../src/Account/Domain/Account'
import { EntityNotFound } from '../../../lib/EntityNotFound'
import { AccountNotFound } from '../../../src/Account/Domain/Exceptions/AccountNotFound'

const sender = new Account(1, 10)
const beneficiary = new Account(2, 10)
const transferAmount = 5

const AccountRepositoryMock = jest.fn<IAccountRepository, []>(() => ({
  findAccountById: async (id) : Promise<Account> => {
    if(id === 1) return Promise.resolve(sender)
    else if (id === 2 ) return Promise.resolve(beneficiary)
    throw new EntityNotFound('Entity does not exist')
  },
  updateBalance: undefined,
}))

test('should return list of transfer', async () => {
  const accountRepositoryMock = new AccountRepositoryMock();
  const transferRepository = new TransferRepository(accountRepositoryMock)

  const expectedExpense = new Transfer(1, sender, beneficiary, transferAmount)
  const expectedIncome = new Transfer(2, beneficiary, sender, transferAmount)
  await transferRepository.saveTransfer(sender.id, beneficiary.id, transferAmount)
  await transferRepository.saveTransfer(beneficiary.id, sender.id, transferAmount)

  const transferHistory = await transferRepository.getTransferHistory(sender.id)
  expect(transferHistory).toEqual([expectedExpense, expectedIncome])
})

test('should save a transfer', async () => {
  const accountRepositoryMock = new AccountRepositoryMock();
  const transferRepository = new TransferRepository(accountRepositoryMock)

  const expectedTransfer = new Transfer(1, sender, beneficiary, transferAmount)
  const newTransferId = await transferRepository.saveTransfer(sender.id, beneficiary.id, transferAmount)

  const foundTransfer = await transferRepository.findById(newTransferId)
  expect(foundTransfer).toEqual(expectedTransfer)
})

test('should throw error if transfer participant does not exist', async () => {
  const accountRepositoryMock = new AccountRepositoryMock();
  const transferRepository = new TransferRepository(accountRepositoryMock)

  expect(async () => await transferRepository.saveTransfer(sender.id, beneficiary.id, transferAmount)).toThrow(AccountNotFound)
})
