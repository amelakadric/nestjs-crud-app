import { Injectable } from '@nestjs/common';
import { CommentRepository } from 'src/database/repositories/comment.repository';
import { UserRepository } from 'src/database/repositories/user.repository';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { PostRepository } from 'src/database/repositories/post.repository';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentRepository,
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostRepository,
  ) {}

  getComments() {
    return this.commentsRepository.getComments();
  }

  async getUserComments(userId: string) {
    const user = await this.userRepository.findById(Number(userId));
    return this.commentsRepository.getUserComments(user);
  }

  async createComment(createCommentDto: CreateCommentDto) {
    const user = await this.userRepository.findById(
      Number(createCommentDto.user),
    );
    const post = await this.postRepository.getPostById(
      Number(createCommentDto.post),
    );

    return this.commentsRepository.store(createCommentDto, user, post);
  }
}
