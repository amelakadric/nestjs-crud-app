import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from 'src/comments/dtos/create-comment.dto';
import { Post } from '../entities/post.entity';
import { User } from '../entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { UpdateCommentDto } from 'src/comments/dtos/update-comment.dto';

export class CommentRepository extends Repository<Comment> {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {
    super(
      commentRepository.target,
      commentRepository.manager,
      commentRepository.queryRunner,
    );
  }

  async getComments(): Promise<Comment[]> {
    const comments = await this.find({ relations: { user: true, post: true } });
    if (comments?.length === 0) {
      throw new NotFoundException('No comments found.');
    }
    return comments;
  }

  async getUserComments(user: User): Promise<Comment[]> {
    const comments = await this.find({ where: { user: user } });
    if (comments?.length === 0) {
      throw new NotFoundException(`No comments found for user #${user.id}.`);
    }
    return comments;
  }

  async createComment(
    createCommentDto: CreateCommentDto,
    user: User,
    post: Post,
  ): Promise<Comment> {
    const { commentText } = createCommentDto;
    const comment = this.create({
      commentText: commentText,
      user: user,
      post: post,
    });
    return this.save(comment);
  }

  async getCommentById(id: number): Promise<Comment | null> {
    const comment = await this.findOneBy({ commentId: id });
    if (!comment) {
      throw new NotFoundException(`Comment with id #${id} not found.`);
    }
    return comment;
  }

  async updateComment(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.findOneBy({ commentId: id });
    if (!comment) {
      throw new NotFoundException(`Comment with id #${id} not found.`);
    }
    Object.assign(comment, updateCommentDto);
    return this.save(comment);
  }

  async deleteComment(id: number): Promise<Comment> {
    const comment = await this.getCommentById(id);
    if (!comment) {
      throw new NotFoundException(`Comment with id #${id} not found.`);
    }
    return await this.remove(comment);
  }
}
