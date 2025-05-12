import { StatisticsController } from 'src/presentation/controllers/statistics.controller';
import { GetLast60SecondsTransactionsUseCase } from 'src/application/use-cases';
import { Transaction } from 'src/domain/entities/transaction.entity';

describe('StatisticsController', () => {
  let controller: StatisticsController;
  let mockUseCase: jest.Mocked<GetLast60SecondsTransactionsUseCase>;

  beforeEach(() => {
    mockUseCase = {
      execute: jest.fn(),
    } as any;

    controller = new StatisticsController(mockUseCase);
  });

  it('deve retornar estatísticas corretas para uma lista de transações', async () => {
    const now = new Date();
    const transactions = [
      new Transaction({ amount: 100, timestamp: now }),
      new Transaction({ amount: 200, timestamp: now }),
      new Transaction({ amount: 300, timestamp: now }),
    ];

    mockUseCase.execute.mockResolvedValue(transactions);

    const result = await controller.list();

    expect(result).toEqual({
      count: 3,
      sum: 600,
      avg: 200,
      min: 100,
      max: 300,
    });
  });

  it('deve retornar estatísticas zeradas se não houver transações', async () => {
    mockUseCase.execute.mockResolvedValue([]);

    const result = await controller.list();

    expect(result).toEqual({
      count: 0,
      sum: 0,
      avg: 0,
      min: 0,
      max: 0,
    });
  });
});
