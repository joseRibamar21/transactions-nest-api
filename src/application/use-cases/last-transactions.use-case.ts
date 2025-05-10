import { Transaction } from "src/domain/entities";
import { TransactionRepository } from "src/domain/repositories";


export class GetLast60SecondsTransactionsUseCase {
  constructor(private readonly transactionRepo: TransactionRepository) {}

  async execute(): Promise<Transaction[]> {
    return this.transactionRepo.getLast60SecondsTransactions();
  }
}
