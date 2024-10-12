import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { mikroOrmConfig } from './common/config/mikroorm.config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      cache: process.env.NODE_ENV !== 'development',
    }),
    MikroOrmModule.forRootAsync(mikroOrmConfig)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
