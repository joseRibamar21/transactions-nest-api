import { Inject, Injectable } from '@nestjs/common';
import { Transaction } from 'src/domain/entities';
import { ITransactionEventHandler } from 'src/domain/interface/events';
import { ITransactionRepository } from 'src/domain/interface/repositories';
import { IAddTransactionUseCase } from 'src/domain/interface/use-case';
import { EVENT_HANDLER_TOKENS, REPOSITORY_TOKENS } from 'src/domain/tokens';



@Injectable()
export class AddTransactionUseCase implements IAddTransactionUseCase {
  constructor(
    @Inject(REPOSITORY_TOKENS.TRANSACTION)
    private readonly transactionRepo: ITransactionRepository,
    @Inject(EVENT_HANDLER_TOKENS.TRANSACTION)
    private readonly eventHandler: ITransactionEventHandler,
  ) {}

  async execute(amount: number, timestamp: Date): Promise<void> {
    const transaction = new Transaction({ amount, timestamp });
  
    await this.transactionRepo.addTransaction(transaction);
    this.eventHandler.onTransactionCreated();
  }
}
