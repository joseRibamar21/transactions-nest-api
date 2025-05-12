import { HealthController } from 'src/presentation/controllers/health.controller';

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(() => {
    controller = new HealthController();
  });

  it('deve retornar informações básicas de saúde da aplicação', () => {
    const result = controller.check();

    expect(result).toHaveProperty('status', 'ok');
    expect(result).toHaveProperty('appName');
    expect(result).toHaveProperty('environment');
    expect(result).toHaveProperty('version');
    expect(result).toHaveProperty('platform');
    expect(result).toHaveProperty('arch');
    expect(result).toHaveProperty('timestamp');

    expect(new Date(result.timestamp).toISOString()).toEqual(result.timestamp);
  });
});
