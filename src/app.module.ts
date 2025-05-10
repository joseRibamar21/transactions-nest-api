import { Module } from '@nestjs/common';
import { TransactionsController } from './presentation/controllers/transactions.controller';

import {
  AddTransactionUseCase,
  DeleteAllTransactionsUseCase,
  GetLast60SecondsTransactionsUseCase,
} from './application/use-cases';

import { MemoryTransactionRepository } from './infrastructure/repository';
import { EVENT_HANDLER_TOKENS, REPOSITORY_TOKENS, USE_CASE_TOKENS } from './domain/tokens';
import { StatisticsGateway } from './presentation/gateways';
import { TransactionEventService } from './infrastructure/service/transaction-event.service';

@Module({
  controllers: [TransactionsController],
  providers: [
    StatisticsGateway,
    {
      provide: EVENT_HANDLER_TOKENS.TRANSACTION,
      useClass: TransactionEventService,
    },
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
