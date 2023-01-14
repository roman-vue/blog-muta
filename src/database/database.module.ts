import { Module } from '@nestjs/common';
import { databaseProvider } from './database.service';

@Module({
  imports: [databaseProvider],
})
export class DatabaseModule {}
