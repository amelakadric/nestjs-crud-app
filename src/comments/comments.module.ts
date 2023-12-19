import { Module } from '@nestjs/common';
import { CommentsService } from './services/comments.service';
import { CommentsController } from './controllers/comments.controller';
import { CommentRepository } from 'src/database/repositories/comment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from 'src/database/repositories/post.repository';
import { UserRepository } from 'src/database/repositories/user.repository';
import { User } from 'src/database/entities/user.entity';
import { Post } from 'src/database/entities/post.entity';
import { Comment } from 'src/database/entities/comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Post])],
  providers: [
    CommentsService,
    CommentRepository,
    UserRepository,
    PostRepository,
  ],
  controllers: [CommentsController],
})
export class CommentsModule {
  exports: [];
}
