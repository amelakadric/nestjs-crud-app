import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/database/entity/user.entity';

export const typeOrmConfig = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.DATABASE,
    entities: [User],
    migrations: [],
    logging: true,
  };
};
