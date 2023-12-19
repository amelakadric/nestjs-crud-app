import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comments.entity';
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

  async getComments() {
    return this.find();
  }

  async store(createCommentDto: CreateCommentDto, user: User, post: Post) {}

  async getCommentById(id: number) {
    const comment = await this.findOne({ where: { commentId: id } });
    if (!comment) {
      throw new NotFoundException(`Post with id #${id} not found.`);
    }
    return comment;
  }

  async updateComment(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.findOneBy({ commentId: id });
    if (!comment) {
      throw new NotFoundException(`Comment with id #${id} not found.`);
    }
    Object.assign(comment, updateCommentDto);
    return this.save(comment);
  }

  async deleteComment(id: number) {
    await this.delete(id);
  }
}
