import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoadStrategy } from '@mikro-orm/core';

import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';



export const mikroOrmConfig = {
  useFactory: (configService: ConfigService) =>
    (
        console.log('POSTGRES_DB', configService.get('POSTGRES_DB', 'localhost')),
      {
      host: configService.get('POSTGRES_HOST', 'localhost'),
      port: configService.get<number>('POSTGRES_PORT', 5432),
      user: configService.get('POSTGRES_USER', 'admin'),
      password: configService.get('POSTGRES_PASSWORD', '12345'),
      dbName: configService.get('POSTGRES_DB', 'postgres'),
      entities: ['dist/**/**/*.entity.js'],
      entitiesTs: ['src/**/**/*.entity.ts'],
      extensions: [Migrator, EntityGenerator, SeedManager],
      persistOnCreate: false,
      debug: true,
      driver: PostgreSqlDriver,
      loadStrategy: LoadStrategy.JOINED,
      highlighter: new SqlHighlighter(),
      metadataProvider: TsMorphMetadataProvider,
      registerRequestContext: false,
      migrations: {
        path: 'dist/migrations',
        pathTs: 'src/migrations',
        disableForeignKeys: false,
      },
      cache: { options: { cacheDir: './.mikro-orm-cache' } },
      seeder: {
        path: 'src/seeders/',
        defaultSeeder: 'DatabaseSeeder',
        glob: '!(*.d).{js,ts}',
        fileName: (className: string) => className,
      },
    }),
  inject: [ConfigService],
  imports: [ConfigModule],
} as MikroOrmModuleOptions;