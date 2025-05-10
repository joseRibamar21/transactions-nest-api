import { Injectable } from '@nestjs/common';

import { ITransactionEventHandler } from 'src/domain/interface/events';
import { StatisticsGateway } from 'src/presentation/gateways';

@Injectable()
export class TransactionEventService implements ITransactionEventHandler {
  constructor(private readonly statisticsGateway: StatisticsGateway) {}

  onTransactionCreated(): void {
    this.statisticsGateway.broadcastStatistics();
  }

  onTransactionsDeleted(): void {
    this.statisticsGateway.broadcastStatistics();
  }
}
