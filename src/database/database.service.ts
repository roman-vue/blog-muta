import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from './entities';

const entitiesLists = Object.values(entities);

export const databaseProvider = TypeOrmModule.forRootAsync({
  imports: [ConfigModule.forRoot({})],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      type: 'postgres',
      host: 'localhost',
      port: 8080,
      username: 'root',
      password: 'password',
      database: 'MUTA',
      logging: false,
      entities: entitiesLists,
      synchronize: false,
    };
  },
});
