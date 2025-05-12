import { StatisticsGateway } from 'src/presentation/gateways/statistics.gateway';
import { IGetLastTransactionsUseCase } from 'src/domain/interface/use-case';
import { Transaction } from 'src/domain/entities';
import { Server, Socket } from 'socket.io';

describe('StatisticsGateway', () => {
  let gateway: StatisticsGateway;
  let useCaseMock: jest.Mocked<IGetLastTransactionsUseCase>;
  let serverMock: jest.Mocked<Server>;
  let clientMock: jest.Mocked<Socket>;

  beforeEach(() => {
    useCaseMock = {
      execute: jest.fn(),
    };

    gateway = new StatisticsGateway(useCaseMock);
    serverMock = {
      emit: jest.fn(),
    } as any;

    clientMock = {
      id: 'test-client',
      emit: jest.fn(),
    } as any;

    gateway.server = serverMock;
  });

  describe('calculateStatistics()', () => {
    it('deve calcular corretamente estatísticas', () => {
      const now = new Date();
      const transactions = [
        new Transaction({ amount: 100, timestamp: now }),
        new Transaction({ amount: 200, timestamp: now }),
      ];

      const stats = (gateway as any).calculateStatistics(transactions);
      expect(stats).toEqual({
        count: 2,
        sum: 300,
        avg: 150,
        min: 100,
        max: 200,
      });
    });

    it('deve retornar zeros quando não há transações', () => {
      const stats = (gateway as any).calculateStatistics([]);
      expect(stats).toEqual({
        count: 0,
        sum: 0,
        avg: 0,
        min: 0,
        max: 0,
      });
    });
  });

  describe('broadcastStatistics()', () => {
    it('deve emitir estatísticas para todos os clientes', async () => {
      useCaseMock.execute.mockResolvedValue([
        new Transaction({ amount: 50, timestamp: new Date() }),
      ]);

      await gateway.broadcastStatistics();

      expect(serverMock.emit).toHaveBeenCalledWith('statisticsUpdate', {
        count: 1,
        sum: 50,
        avg: 50,
        min: 50,
        max: 50,
      });
    });
  });

  describe('sendStatisticsToClient()', () => {
    it('deve enviar estatísticas para o cliente conectado', async () => {
      useCaseMock.execute.mockResolvedValue([
        new Transaction({ amount: 75, timestamp: new Date() }),
      ]);

      await (gateway as any).sendStatisticsToClient(clientMock);

      expect(clientMock.emit).toHaveBeenCalledWith('statisticsUpdate', {
        count: 1,
        sum: 75,
        avg: 75,
        min: 75,
        max: 75,
      });
    });
  });

  describe('handleConnection()', () => {
    it('deve logar conexão e enviar estatísticas', async () => {
      useCaseMock.execute.mockResolvedValue([
        new Transaction({ amount: 10, timestamp: new Date() }),
      ]);

      const spy = jest.spyOn<any, any>(gateway, 'sendStatisticsToClient');
      await gateway.handleConnection(clientMock);

      expect(spy).toHaveBeenCalledWith(clientMock);
    });
  });

  describe('handleStatisticsRequest()', () => {
    it('deve responder com estatísticas ao evento requestStatistics', async () => {
      useCaseMock.execute.mockResolvedValue([
        new Transaction({ amount: 30, timestamp: new Date() }),
      ]);

      const spy = jest.spyOn<any, any>(gateway, 'sendStatisticsToClient');
      await gateway.handleStatisticsRequest(clientMock);

      expect(spy).toHaveBeenCalledWith(clientMock);
    });
  });
});
