import { Injectable, Logger } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PostRepository } from 'src/database/repositories/post.repository';
import { create } from 'domain';
import { UserRepository } from 'src/database/repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/database/entities/post.entity';
import { UpdatePostDto } from '../dtos/update-post.dto';

@Injectable()
export class PostsService {
  logger: Logger;
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
  ) {
    this.logger = new Logger(PostsService.name);
  }

  async createPost(createPostDto: CreatePostDto) {
    const user = await this.userRepository.findById(createPostDto.userId);
    return this.postRepository.store(createPostDto, user);
  }

  async getAllPosts() {
    return this.postRepository.getPosts();
  }

  getPostById(id: string) {
    return this.postRepository.getPostById(Number(id));
  }

  updatePost(id: string, updatePostDto: UpdatePostDto) {
    return this.postRepository.updatePost(Number(id), updatePostDto);
  }

  deletePost(id: string) {
    return this.postRepository.deletePost(Number(id));
  }
}
