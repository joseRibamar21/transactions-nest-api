import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';


describe('TransactionsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/transactions (POST) deve criar uma transação válida', async () => {
    const res = await request(app.getHttpServer())
      .post('/transactions')
      .send({
        amount: 100,
        timestamp: new Date().toISOString(),
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Transação aceita e registrada.');
  });

  it('/transactions (POST) deve retornar 422 para amount negativo', async () => {
    const res = await request(app.getHttpServer())
      .post('/transactions')
      .send({
        amount: -50,
        timestamp: new Date().toISOString(),
      });

    expect(res.statusCode).toBe(422);
    expect(res.body.message).toContain('O amount não pode ser negativo.');
  });

  it('/transactions (POST) deve retornar 400 para timestamp inválido', async () => {
    const res = await request(app.getHttpServer())
      .post('/transactions')
      .send({
        amount: 100,
        timestamp: 'invalid-date',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message[0]).toContain("Timestamp deve ser uma data válida no formato ISO 8601");
  });

  it('/transactions (POST) deve verificar se a entrada é JSON', async () => {
    const res = await request(app.getHttpServer())
      .post('/transactions')
      .set('Content-Type', 'text/plain')
      .send('amount=100&timestamp=2023-10-01T00:00:00Z');
    expect(res.statusCode).toBe(415);
    expect(res.body.message).toBe('Content-Type not supported. Only application/json is allowed.');
  });

  it('/transactions (DELETE) deve deletar todas as transações', async () => {
    const res = await request(app.getHttpServer())
      .delete('/transactions')
      .send();

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Todas as transações foram apagadas com sucesso.');
  });

});
