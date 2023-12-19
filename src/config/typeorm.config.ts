import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Post } from 'src/database/entities/post.entity';
import { User } from 'src/database/entities/user.entity';
import { Comment } from 'src/database/entities/comments.entity';

export const typeOrmConfig = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [User, Post, Comment],
    migrations: [],
    logging: true,
    synchronize: true,
  };
};
