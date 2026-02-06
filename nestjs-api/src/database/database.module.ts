// src/database/database.module.ts
import { Module, Global } from '@nestjs/common';
import * as sql from 'mssql';
import { sqlConfig } from './db.config';

@Global() // Makes the provider available everywhere without re-importing
@Module({
  providers: [
    {
      provide: 'SQL_CONNECTION',
      useFactory: async () => {
        try {
          const pool = await sql.connect(sqlConfig);
          console.log('Connected to SQL Server');
          return pool;
        } catch (err) {
          console.error('Database connection failed:', err);
          throw err;
        }
      },
    },
  ],
  exports: ['SQL_CONNECTION'],
})
export class DatabaseModule {}
