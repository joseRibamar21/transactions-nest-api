import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Inject, Logger } from '@nestjs/common';
import { IGetLastTransactionsUseCase } from 'src/domain/interface/use-case';
import { USE_CASE_TOKENS } from 'src/domain/tokens';
import { Transaction } from 'src/domain/entities';


@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  namespace: 'statistics',
})
export class StatisticsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(StatisticsGateway.name);
  private statisticsInterval: NodeJS.Timeout;

  constructor(
    @Inject(USE_CASE_TOKENS.GET_LAST_TRANSACTIONS)
    private readonly getStatisticsUseCase: IGetLastTransactionsUseCase,
  ) { }

  afterInit() {
    this.logger.log('WebSocket Gateway initialized');
    this.startStatisticsBroadcast();
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    this.sendStatisticsToClient(client);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('requestStatistics')
  async handleStatisticsRequest(client: Socket) {
    await this.sendStatisticsToClient(client);
  }

  private startStatisticsBroadcast() {
    this.statisticsInterval = setInterval(async () => {
      await this.broadcastStatistics();
    }, 5000);
  }

  private calculateStatistics(itens: Transaction[]) {
    const amounts = itens.map(t => Number(t.amount));
    const sum = amounts.reduce((acc, curr) => acc + curr, 0);

    return {
      count: itens.length,
      sum: sum,
      avg: itens.length ? sum / itens.length : 0,
      min: itens.length ? Math.min(...amounts) : 0,
      max: itens.length ? Math.max(...amounts) : 0,
    };
  }

  async broadcastStatistics() {
    try {
      const itens = await this.getStatisticsUseCase.execute();
      const statistics = this.calculateStatistics(itens);

      this.server.emit('statisticsUpdate', statistics);
      this.logger.debug('Broadcasting statistics to all clients');
    } catch (error) {
      this.logger.error('Error broadcasting statistics', error);
    }
  }

  private async sendStatisticsToClient(client: Socket) {
    try {
      const itens = await this.getStatisticsUseCase.execute();
      
      const statistics = this.calculateStatistics(itens);
      client.emit('statisticsUpdate', statistics);
    } catch (error) {
      this.logger.error('Error sending statistics to client', error);
    }
  }

  onModuleDestroy() {
    if (this.statisticsInterval) {
      clearInterval(this.statisticsInterval);
    }
  }
}
