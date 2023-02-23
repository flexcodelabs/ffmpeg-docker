import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpErrorFilter } from './core/interceptors/errors.interceptor';
import { LoggingInterceptor } from './core/interceptors/logging.interceptor';
import { SYSTEMINIT } from './core/system/system.configuration';

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  SYSTEMINIT();

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new HttpErrorFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: false,
      skipMissingProperties: true,
    }),
  );
  const PORT = process.env.PORT || 3000;
  app.disable('x-powered-by');
  await app.listen(PORT);
  Logger.debug(`App Listening on Port: ${PORT}`, 'APP');
};
bootstrap();
