import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupHelmet, setupSwagger, winstonConfig } from './infrastructure/config';
import { ValidationPipe } from '@nestjs/common';
import { env } from './infrastructure/config/dotenv.config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: winstonConfig,
  });

  setupSwagger(app);
  setupHelmet(app);
  
  app.use((_req: any, res: { setHeader: (arg0: string, arg1: string) => void; }, next: () => void) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  });


  app.enableCors({
    origin: env.corsOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(env.port);
}
bootstrap();
