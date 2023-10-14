import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.IS_DEV) {
    app.enableCors();
  }

  await app.listen(3000);
}
bootstrap();
