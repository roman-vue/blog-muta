import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from './entities';
import { LoggerService } from 'src/config';

const entitiesLists = Object.values(entities);
export const databaseProvider = TypeOrmModule.forRootAsync({
  imports: [ConfigModule.forRoot({})],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    LoggerService.debug(`${configService.get('PGDB')}`);
    return {
      type: 'postgres',
      host: configService.get('PGHOST'),
      port: configService.get('PGPORT'),
      username: configService.get('PGUSER'),
      password: configService.get('PGPASSWORD'),
      database: configService.get('PGDB'),
      logging: false,
      entities: entitiesLists,
      synchronize: false,
    };
  },
});
