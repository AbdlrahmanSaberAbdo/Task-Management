import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './users/user.module';
import { DatabaseModule } from './database/databaseModule';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      cache: process.env.NODE_ENV !== 'development',
    }),
    MikroOrmModule.forRootAsync(DatabaseModule)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
