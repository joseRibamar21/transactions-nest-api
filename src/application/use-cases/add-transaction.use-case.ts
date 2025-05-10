import { Inject, Injectable } from '@nestjs/common';
import { Transaction } from 'src/domain/entities';
import { ITransactionRepository } from 'src/domain/interface/repositories';
import { IAddTransactionUseCase } from 'src/domain/interface/use-case';
import { REPOSITORY_TOKENS } from 'src/domain/tokens';



@Injectable()
export class AddTransactionUseCase implements IAddTransactionUseCase {
  constructor(
    @Inject(REPOSITORY_TOKENS.TRANSACTION)
    private readonly transactionRepo: ITransactionRepository
  ) {}

  async execute(amount: number, timestamp: Date): Promise<void> {
    const transaction = new Transaction({ amount, timestamp });
  
    await this.transactionRepo.addTransaction(transaction);
  }
}
