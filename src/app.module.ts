import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/databaseModule';
import { TaskModule } from './task/task.module';
import { MikroORM } from '@mikro-orm/core';
import { ElasticModule } from './tools/elastic/elastic.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      cache: process.env.NODE_ENV !== 'development',
    }),
    MikroOrmModule.forRootAsync(DatabaseModule),
    UserModule,
    TaskModule,
    ElasticModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private readonly orm: MikroORM) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware).forRoutes('*');
  }
}