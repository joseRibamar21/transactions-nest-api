import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('StatisticsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/statistics (GET) - deve retornar estatísticas válidas (mesmo sem transações)', async () => {
    const response = await request(app.getHttpServer()).get('/statistics');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      count: expect.any(Number),
      sum: expect.any(Number),
      avg: expect.any(Number),
      min: expect.any(Number),
      max: expect.any(Number),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
