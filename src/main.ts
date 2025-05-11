import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupHelmet, setupSwagger, winstonConfig } from './infrastructure/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: winstonConfig,
  });

  setupSwagger(app);
  setupHelmet(app);
  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
