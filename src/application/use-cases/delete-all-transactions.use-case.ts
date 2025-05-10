import { TransactionRepository } from "src/domain/repositories";

export class DeleteAllTransactionsUseCase {
  constructor(private readonly transactionRepo: TransactionRepository) {}

  async execute(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 200));
    this.transactionRepo.deleteAll();
  }
}
