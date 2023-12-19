import { Injectable, Logger } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PostRepository } from 'src/database/repositories/post.repository';
import { create } from 'domain';
import { UserRepository } from 'src/database/repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/database/entities/post.entity';

@Injectable()
export class PostsService {
  logger: Logger;
  constructor(
    // @InjectRepository(Post)
    // private readonly postRepository: Repository<Post>,
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
  ) {
    this.logger = new Logger(PostsService.name);
  }

  async createPost(createPostDto: CreatePostDto) {
    const user = await this.userRepository.findById(createPostDto.userId);
    return this.postRepository.store(createPostDto, user);
  }
}
