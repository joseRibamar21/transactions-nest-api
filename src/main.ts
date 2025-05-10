import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger, winstonConfig } from './infrastructure/config';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: winstonConfig,
  });

  setupSwagger(app);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
