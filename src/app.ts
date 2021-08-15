import { Account } from './Account/Domain/Account';
import { Container } from './Container';
import { Server } from './http/Server'

const port : string = process.env.PORT || "8080"

const handleError = (e: any) : void => {
  console.log(e);
  process.exit(1)
}

// Initialize database with a few accounts
const container: Container = Container.getContainer()
container.accountRepository.save({ balance: 300 });
container.accountRepository.save({ balance: 250 });

try{
  new Server(port).listen().catch(error => handleError(error))
} catch (error) {
  handleError(error)
}

