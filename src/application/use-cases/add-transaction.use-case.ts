import { Transaction } from 'src/domain/entities';
import { TransactionRepository } from 'src/domain/repositories';


interface AddTransactionInput {
  amount: string;
  timestamp: Date;
}

export class AddTransactionUseCase {
  constructor(private readonly transactionRepo: TransactionRepository) {}

  async execute(input: AddTransactionInput): Promise<void> {
    const transaction = new Transaction(input);
    
    await new Promise(resolve => setTimeout(resolve, 200));
    this.transactionRepo.addTransaction(transaction);
  }
}
