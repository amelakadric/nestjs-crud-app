import { Module } from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { PostRepository } from 'src/database/repositories/post.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/database/entities/post.entity';
import { UserRepository } from 'src/database/repositories/user.repository';
import { User } from 'src/database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, PostRepository])],
  providers: [PostsService, PostRepository, UserRepository],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}
