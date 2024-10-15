import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MikroORM } from '@mikro-orm/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());

  const orm = app.get<MikroORM>(MikroORM);
  await orm.getMigrator().up();

  await app.listen(3000);
}
bootstrap();
