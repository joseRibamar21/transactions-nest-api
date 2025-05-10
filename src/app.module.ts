import { Module } from '@nestjs/common';
import { TransactionsController } from './presentation/controllers/transactions.controller';

import {
  AddTransactionUseCase,
  DeleteAllTransactionsUseCase,
  GetLast60SecondsTransactionsUseCase,
} from './application/use-cases';

import { MemoryTransactionRepository } from './infrastructure/repository';
import { REPOSITORY_TOKENS, USE_CASE_TOKENS } from './domain/tokens';

@Module({
  controllers: [TransactionsController],
  providers: [
    {
      provide: USE_CASE_TOKENS.ADD_TRANSACTION,
      useClass: AddTransactionUseCase,
    },
    {
      provide: USE_CASE_TOKENS.DELETE_ALL_TRANSACTIONS,
      useClass: DeleteAllTransactionsUseCase,
    },
    {
      provide: USE_CASE_TOKENS.GET_LAST_TRANSACTIONS,
      useClass: GetLast60SecondsTransactionsUseCase,
    },
    {
      provide: REPOSITORY_TOKENS.TRANSACTION,
      useClass: MemoryTransactionRepository,
    },
  ],
})
export class AppModule {}
