import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('HealthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/health (GET) - deve retornar status ok e metadados da aplicação', async () => {
    const response = await request(app.getHttpServer()).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('appName');
    expect(response.body).toHaveProperty('environment');
    expect(response.body).toHaveProperty('version');
    expect(response.body).toHaveProperty('platform');
    expect(response.body).toHaveProperty('arch');
    expect(response.body).toHaveProperty('timestamp');

    // valida se timestamp está em formato ISO
    expect(new Date(response.body.timestamp).toISOString()).toEqual(response.body.timestamp);
  });

  afterAll(async () => {
    await app.close();
  });
});
