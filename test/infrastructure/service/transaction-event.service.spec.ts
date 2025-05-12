import { TransactionEventService } from "src/infrastructure/service/transaction-event.service";
import { StatisticsGateway } from "src/presentation/gateways";

describe('TransactionEventService', () => {
  let service: TransactionEventService;
  let mockGateway: StatisticsGateway;

  beforeEach(() => {
    mockGateway = {
      broadcastStatistics: jest.fn(),
    } as any;

    service = new TransactionEventService(mockGateway);
  });

  it('deve chamar broadcastStatistics ao criar uma transação', () => {
    service.onTransactionCreated();
    expect(mockGateway.broadcastStatistics).toHaveBeenCalledTimes(1);
  });

  it('deve chamar broadcastStatistics ao deletar transações', () => {
    service.onTransactionsDeleted();
    expect(mockGateway.broadcastStatistics).toHaveBeenCalledTimes(1);
  });
});
