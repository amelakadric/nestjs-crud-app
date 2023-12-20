import { DataSource } from 'typeorm';
import { typeOrmConfig } from './typeorm.config';
import { User } from 'src/database/entities/user.entity';
import { Post } from 'src/database/entities/post.entity';
import { Comment } from 'src/database/entities/comment.entity';
import { UserRefactor1703088796103 } from 'src/database/migrations/1703088796103-UserRefactor';
import { SchemaSync1703090739728 } from 'src/database/migrations/1703090739728-SchemaSync';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'amelakadric',
  password: '',
  database: 'postgres',
  entities: [User, Post, Comment],
  migrations: [UserRefactor1703088796103, SchemaSync1703090739728],
  logging: true,
  synchronize: true,
});
