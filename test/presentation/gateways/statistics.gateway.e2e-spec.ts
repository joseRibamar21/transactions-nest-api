import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { io as Client, Socket as ClientSocket } from 'socket.io-client';

describe('StatisticsGateway (e2e)', () => {
    let app: INestApplication;
    let clientSocket: ClientSocket;
  
    beforeAll(async () => {
      const moduleFixture = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
  
      app = moduleFixture.createNestApplication();
      await app.init();
      await app.listen(3000);
  
      clientSocket = Client(`http://localhost:3000/statistics`, {
        transports: ['websocket'],
      });
  
      await new Promise<void>((resolve) => {
        clientSocket.on('connect', () => resolve());
      });
    }, 15000); // aumenta timeout
  
    afterAll(async () => {
      if (clientSocket.connected) {
        clientSocket.disconnect();
      }
      await app.close();
    });
  
    it('deve receber estatísticas via evento statisticsUpdate ao enviar requestStatistics', (done) => {
      clientSocket.once('statisticsUpdate', (data) => {
        expect(data).toHaveProperty('count');
        expect(data).toHaveProperty('sum');
        expect(data).toHaveProperty('avg');
        expect(data).toHaveProperty('min');
        expect(data).toHaveProperty('max');
        done();
      });
  
      clientSocket.emit('requestStatistics');
    });
  });
  
