import { Injectable, Logger } from '@nestjs/common';
import { CommentRepository } from 'src/database/repositories/comment.repository';
import { UserRepository } from 'src/database/repositories/user.repository';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { PostRepository } from 'src/database/repositories/post.repository';
import { Comment } from '../../database/entities/comments.entity';
import { UpdateCommentDto } from '../dtos/update-comment.dto';

@Injectable()
export class CommentsService {
  logger: Logger;
  constructor(
    private readonly commentsRepository: CommentRepository,
    private readonly userRepository: UserRepository,
    private readonly postRepository: PostRepository,
  ) {
    this.logger = new Logger(CommentsService.name);
  }

  getComments(): Promise<Comment[]> {
    return this.commentsRepository.getComments();
  }

  async getUserComments(userId: string): Promise<Comment[]> {
    const user = await this.userRepository.findById(Number(userId));
    return this.commentsRepository.getUserComments(user);
  }

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const user = await this.userRepository.findById(
      Number(createCommentDto.user),
    );
    const post = await this.postRepository.getPostById(
      Number(createCommentDto.post),
    );
    return this.commentsRepository.createComment(createCommentDto, user, post);
  }

  async updateComment(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const updatedComment = await this.commentsRepository.updateComment(
      Number(id),
      updateCommentDto,
    );
    this.logger.log('Comment uploaded', { updatedComment });
    return updatedComment;
  }

  async deleteComment(id: string) {
    const deletedComment = await this.commentsRepository.deleteComment(
      Number(id),
    );
    this.logger.log('Comment deleted', { deletedComment });
    return `Delted comment #${id}`;
  }
}
