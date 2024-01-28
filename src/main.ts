import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  const port = 3005;

  await app.listen(port);
  logger.log(`🔥 Server is Opened PORT : ${port}`);
}
bootstrap();
