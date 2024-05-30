import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { ConfigService, ConfigModule } from '@nestjs/config';

const poolFactory = {
  provide: 'DATABASE_POOL',
  useFactory: async (configService: ConfigService) => {
    const pool = new Pool({
      user: configService.get<string>('DATABASE_USER'),
      host: configService.get<string>('DATABASE_HOST'),
      database: configService.get<string>('DATABASE_NAME'),
      password: configService.get<string>('DATABASE_PASSWORD'),
      port: configService.get<number>('DATABASE_PORT'),
    });
    return pool;
  },
  inject: [ConfigService],
};

@Module({
  imports: [ConfigModule],
  providers: [poolFactory],
  exports: ['DATABASE_POOL'],
})
export class DatabaseModule {}
