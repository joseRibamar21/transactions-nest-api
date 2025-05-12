import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import {
  AddTransactionUseCase,
  DeleteAllTransactionsUseCase,
  GetLast60SecondsTransactionsUseCase,
} from './application/use-cases';

import { MemoryTransactionRepository } from './infrastructure/repository';
import { EVENT_HANDLER_TOKENS, REPOSITORY_TOKENS, USE_CASE_TOKENS } from './domain/tokens';
import { StatisticsGateway } from './presentation/gateways';
import { TransactionEventService } from './infrastructure/service/transaction-event.service';
import {
  HealthController,
  StatisticsController,
  TransactionsController,
  WebSocketInfoController
} from './presentation/controllers';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { JsonOnlyMiddleware } from './infrastructure/middleware';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
      serveStaticOptions: {
        index: ['dashboard.html'],
      },
    }),
  ],


  controllers: [
    HealthController,
    TransactionsController,
    StatisticsController,
    WebSocketInfoController
  ],
  providers: [
    StatisticsGateway,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
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

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JsonOnlyMiddleware)
      .forRoutes(
        { path: '*', method: RequestMethod.POST },
        { path: '*', method: RequestMethod.PUT },
        { path: '*', method: RequestMethod.PATCH },
      );
  }
}
